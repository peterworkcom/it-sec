import MarkdownIt from "markdown-it";
import { dirOf, resolveContentAsset } from "./content";

const md = new MarkdownIt({ html: true, linkify: true });

type RenderEnv = { dir?: string };

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

// A relative image src resolves against the page URL, which is always "/" here
// because the file is selected via the ?file= query string. Rewrite it to the
// bundled asset URL, resolved from the folder of the markdown file itself.
const defaultImage =
  md.renderer.rules.image ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const src = token.attrGet("src");
  const dir = (env as RenderEnv | undefined)?.dir;
  if (typeof src === "string" && dir) {
    const resolved = resolveContentAsset(src, dir);
    if (resolved) token.attrSet("src", resolved);
  }
  return defaultImage(tokens, idx, options, env, self);
};

export const renderMarkdown = (raw: string, filePath?: string): string =>
  md.render(raw, filePath ? ({ dir: dirOf(filePath) } satisfies RenderEnv) : {});
