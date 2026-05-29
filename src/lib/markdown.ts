const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const parseInline = (text: string): string => {
  const saved: string[] = [];

  text = text.replace(/`([^`]+)`/g, (_, c: string) => {
    saved.push(`<code>${escapeHtml(c)}</code>`);
    return `\x00${saved.length - 1}\x00`;
  });

  text = text.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (_, label: string, url: string) => {
    saved.push(`<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`);
    return `\x00${saved.length - 1}\x00`;
  });

  text = escapeHtml(text);
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");

  return text.replace(/\x00(\d+)\x00/g, (_, i: string) => saved[Number(i)]);
};

const parseTable = (lines: string[]): string => {
  const rows = lines.map((l) =>
    l
      .trim()
      .slice(1, -1)
      .split(/(?<!\\)\|/)
      .map((c) => c.trim().replace(/\\\|/g, "|")),
  );
  const sepIdx = rows.findIndex((r) => r.every((c) => /^[-: ]+$/.test(c)));

  if (sepIdx < 0) {
    const body = rows
      .map((r) => `<tr>${r.map((c) => `<td>${parseInline(c)}</td>`).join("")}</tr>`)
      .join("");
    return `<table><tbody>${body}</tbody></table>`;
  }

  const thead = rows
    .slice(0, sepIdx)
    .map((r) => `<tr>${r.map((c) => `<th>${parseInline(c)}</th>`).join("")}</tr>`)
    .join("");
  const tbody = rows
    .slice(sepIdx + 1)
    .map((r) => `<tr>${r.map((c) => `<td>${parseInline(c)}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
};

const blockTagRe =
  /^<(table|thead|tbody|tfoot|tr|div|section|article|aside|details|summary|figure|figcaption|form|fieldset|header|footer|nav|main|ol|ul|dl|pre|blockquote|address|video|audio|canvas|iframe|svg|math)(\s|>|\/>|$)/i;
const voidTagRe = /^<(hr|br|img|input|source|track|col|wbr|area|embed|link|meta)(\s|>|\/>|$)/i;

const parseBlock = (lines: string[]): string => {
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) {
      const lvl = hm[1].length;
      html.push(`<h${lvl}>${parseInline(hm[2])}</h${lvl}>`);
      i++;
      continue;
    }

    if (/^-{3,}$/.test(line.trim())) {
      html.push("<hr>");
      i++;
      continue;
    }

    const trimmed = line.trim();
    if (voidTagRe.test(trimmed)) {
      html.push(line);
      i++;
      continue;
    }

    const blockOpen = trimmed.match(blockTagRe);
    if (blockOpen) {
      const tag = blockOpen[1].toLowerCase();
      const openRe = new RegExp(`<${tag}(?=[\\s/>])`, "gi");
      const closeRe = new RegExp(`</${tag}\\s*>`, "gi");
      const collected: string[] = [];
      let depth = 0;
      while (i < lines.length) {
        const cur = lines[i];
        collected.push(cur);
        depth += (cur.match(openRe) || []).length;
        depth -= (cur.match(closeRe) || []).length;
        i++;
        if (depth <= 0) break;
      }
      html.push(collected.join("\n"));
      continue;
    }

    if (line.trim().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i]);
        i++;
      }
      html.push(parseTable(rows));
      continue;
    }

    if (line.startsWith("> ")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        parts.push(lines[i].slice(2));
        i++;
      }
      html.push(`<blockquote>${parseInline(parts.join(" "))}</blockquote>`);
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      html.push(`<ul>${items.map((it) => `<li>${parseInline(it)}</li>`).join("")}</ul>`);
      continue;
    }

    html.push(`<p>${parseInline(line)}</p>`);
    i++;
  }

  return html.join("\n");
};

export const renderMarkdown = (raw: string): string => {
  const parts: string[] = [];
  const fenceRe = /^```(\w*)\n?([\s\S]*?)^```/gm;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = fenceRe.exec(raw)) !== null) {
    if (m.index > last) {
      parts.push(parseBlock(raw.slice(last, m.index).split("\n")));
    }
    const lang = m[1];
    const code = escapeHtml(m[2]);
    parts.push(`<pre${lang ? ` data-lang="${lang}"` : ""}><code>${code}</code></pre>`);
    last = m.index + m[0].length;
  }

  if (last < raw.length) {
    parts.push(parseBlock(raw.slice(last).split("\n")));
  }

  return parts.join("\n");
};
