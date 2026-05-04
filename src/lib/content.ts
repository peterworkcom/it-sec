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

export const searchFiles = (query: string): FileNode[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allFiles.filter(
    (f) => f.name.toLowerCase().includes(q) || f.content.toLowerCase().includes(q),
  );
};
