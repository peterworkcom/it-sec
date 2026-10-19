# Behavioural Analysis

A company called TryTrainMe loaded an AI model file. The file looked safe:

- It passed its checksum.
- The organisation's name looked real.
- The logs showed nothing wrong.

But the moment the file loaded, it tried to **steal system passwords** and send them to an outside server.

## What a safe load looks like

A clean model load has just **5 steps**:

1. Session starts
2. Model starts loading
3. The file is read
4. A working model is returned
5. Session stops

Nothing happens outside the file.

## What the bad load looked like

Three warning signs appeared:

- **A dangerous import.** The file loaded the `os` module, which can run commands on the computer.
- **Two critical system calls.** It ran a shell command to send the `/etc/passwd` file to an outside server.
- **The wrong result.** It returned a plain number (`int`), not a real model.

> The attack **failed** only because the outside server could not be reached. But the attempt still happened as soon as `pickle.load()` ran.

## Why this is scary

The model still **answers questions normally**. You cannot tell anything is wrong by using it.

The **telemetry** (the event log) is the only clue.

## How to protect against this

- **Scan model files before loading them.** This catches the attack early. (Task 5 covers the tools for this.)
- **Load models in a sandbox.** This is a separate, safe space.
- **Use Python audit hooks.** `sys.addaudithook()` (from Python 3.8) watches for risky actions like imports and system commands.
- **Use a custom unpickler.** Override `find_class()` to log every module the file tries to use.

These steps help you spot danger **before** a model reaches a trusted place.
