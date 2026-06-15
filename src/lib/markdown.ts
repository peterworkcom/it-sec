import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true, linkify: true });

// Keep `data-lang` on <pre> so the existing CSS language label
// (markdown.css: pre[data-lang]::before) and copy button keep working.
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info.trim().split(/\s+/)[0];
  const attr = lang ? ` data-lang="${md.utils.escapeHtml(lang)}"` : "";
  return `<pre${attr}><code>${md.utils.escapeHtml(token.content)}</code></pre>`;
};

// Open links in a new tab, matching the previous renderer's behavior.
const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrSet("target", "_blank");
  tokens[idx].attrSet("rel", "noopener noreferrer");
  return defaultLinkOpen(tokens, idx, options, env, self);
};

export const renderMarkdown = (raw: string): string => md.render(raw);
