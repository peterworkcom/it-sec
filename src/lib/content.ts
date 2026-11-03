const raw = import.meta.glob<string>("/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type FileNode = {
  type: "file";
  name: string;
  path: string;
  content: string;
};

export type FolderNode = {
  type: "folder";
  name: string;
  children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

const insertPath = (folder: FolderNode, parts: string[], fullPath: string, content: string) => {
  if (parts.length === 1) {
    folder.children.push({
      type: "file",
      name: parts[0].replace(/\.md$/, ""),
      path: fullPath,
      content,
    });
    return;
  }
  const name = parts[0];
  let child = folder.children.find((c): c is FolderNode => c.type === "folder" && c.name === name);
  if (!child) {
    child = { type: "folder", name, children: [] };
    folder.children.push(child);
  }
  insertPath(child, parts.slice(1), fullPath, content);
};

const sortTree = (folder: FolderNode): void => {
  folder.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
  for (const child of folder.children) {
    if (child.type === "folder") sortTree(child);
  }
};

export const contentTree: FolderNode = (() => {
  const root: FolderNode = { type: "folder", name: "root", children: [] };
  for (const [path, content] of Object.entries(raw)) {
    const relative = path.replace("/content/", "");
    insertPath(root, relative.split("/"), path, content);
  }
  sortTree(root);
  return root;
})();

export const allFiles: FileNode[] = Object.entries(raw).map(([path, content]) => ({
  type: "file" as const,
  name: path.split("/").pop()!.replace(/\.md$/, ""),
  path,
  content,
}));

export const hasContent = allFiles.length > 0;

export const fileToSlug = (path: string): string =>
  path.replace(/^\/content\//, "").replace(/\.md$/, "");

const filesBySlug = new Map(allFiles.map((f) => [fileToSlug(f.path), f]));

export const findFileBySlug = (slug: string): FileNode | undefined => filesBySlug.get(slug);

export const searchFiles = (query: string): FileNode[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allFiles.filter(
    (f) => f.name.toLowerCase().includes(q) || f.content.toLowerCase().includes(q),
  );
};

// Image assets that sit next to the markdown files. Globbing them with `?url`
// makes Vite emit each one as a real build asset and hands back its final URL,
// so they keep working after `vite build` hashes and relocates them.
const assetUrls = import.meta.glob<string>("/content/**/*.{png,jpg,jpeg,gif,svg,webp,avif,ico}", {
  query: "?url",
  import: "default",
  eager: true,
});

// Anything with a scheme (http:, data:, mailto:) or a protocol-relative "//".
const isExternal = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const normalizePath = (path: string): string => {
  const out: string[] = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return "/" + out.join("/");
};

export const dirOf = (filePath: string): string => filePath.slice(0, filePath.lastIndexOf("/"));

/**
 * Resolve a markdown asset reference against the folder of the file it came from.
 * Returns the bundled asset URL, or null to leave the original src untouched.
 */
export const resolveContentAsset = (src: string, fromDir: string): string | null => {
  if (!src || src.startsWith("#") || isExternal.test(src)) return null;
  const absolute = src.startsWith("/") ? normalizePath(src) : normalizePath(`${fromDir}/${src}`);
  return assetUrls[absolute] ?? null;
};
