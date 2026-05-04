import { createEffect, createSignal, For, Show } from "solid-js";
import type { FolderNode, FileNode, TreeNode } from "../../lib/content";
import styles from "./Sidebar.module.css";

const CONTENT_ROOT = "/content";

const ancestorFolderPaths = (filePath: string): string[] => {
  const segments = filePath.split("/").slice(0, -1);
  const paths: string[] = [];
  for (let i = 3; i <= segments.length; i++) {
    paths.push(segments.slice(0, i).join("/"));
  }
  return paths;
};

type SidebarProps = {
  tree: FolderNode;
  selected: string | null;
  onSelect: (file: FileNode) => void;
  searchQuery: string;
  onSearchQuery: (q: string) => void;
  searchResults: FileNode[];
};

const Sidebar = (props: SidebarProps) => {
  const [expanded, setExpanded] = createSignal<Set<string>>(new Set());

  const expandAncestors = (filePath: string) => {
    const ancestors = ancestorFolderPaths(filePath);
    if (ancestors.length === 0) return;
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const p of ancestors) next.add(p);
      return next;
    });
  };

  createEffect(() => {
    const sel = props.selected;
    if (sel) expandAncestors(sel);
  });

  const toggle = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const collapseAll = () => setExpanded(new Set<string>());

  const reveal = () => {
    const sel = props.selected;
    if (!sel) return;
    if (props.searchQuery) props.onSearchQuery("");
    expandAncestors(sel);
  };

  return (
    <aside class={styles.sidebar}>
      <div class={styles.sidebarSearch}>
        <input
          type="search"
          placeholder="Search..."
          value={props.searchQuery}
          onInput={(e) => props.onSearchQuery(e.currentTarget.value)}
        />
      </div>
      <div class={styles.sidebarActions}>
        <button class={styles.actionBtn} onClick={collapseAll}>
          Collapse all
        </button>
        <button class={styles.actionBtn} onClick={reveal} disabled={!props.selected}>
          Reveal
        </button>
      </div>
      <nav class={styles.sidebarNav}>
        <Show
          when={props.searchQuery.trim()}
          fallback={
            <TreeList
              nodes={props.tree.children}
              parentPath={CONTENT_ROOT}
              selected={props.selected}
              onSelect={props.onSelect}
              expanded={expanded()}
              onToggle={toggle}
            />
          }
        >
          <ul class={styles.treeList}>
            <Show when={props.searchResults.length === 0}>
              <li class={styles.noResults}>No results</li>
            </Show>
            <For each={props.searchResults}>
              {(file) => (
                <li>
                  <button
                    class={styles.sidebarFile}
                    classList={{ [styles.active]: props.selected === file.path }}
                    onClick={() => props.onSelect(file)}
                    title={file.name}
                  >
                    <span class={styles.sidebarLabel}>{file.name}</span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </nav>
    </aside>
  );
};

type TreeListProps = {
  nodes: TreeNode[];
  parentPath: string;
  selected: string | null;
  onSelect: (file: FileNode) => void;
  expanded: Set<string>;
  onToggle: (path: string) => void;
};

const TreeList = (props: TreeListProps) => (
  <ul class={styles.treeList}>
    <For each={props.nodes}>
      {(node) =>
        node.type === "folder" ? (
          <FolderItem
            folder={node}
            parentPath={props.parentPath}
            selected={props.selected}
            onSelect={props.onSelect}
            expanded={props.expanded}
            onToggle={props.onToggle}
          />
        ) : (
          <li>
            <button
              class={styles.sidebarFile}
              classList={{ [styles.active]: props.selected === node.path }}
              onClick={() => props.onSelect(node)}
              title={node.name}
            >
              <span class={styles.sidebarLabel}>{node.name}</span>
            </button>
          </li>
        )
      }
    </For>
  </ul>
);

type FolderItemProps = {
  folder: FolderNode;
  parentPath: string;
  selected: string | null;
  onSelect: (file: FileNode) => void;
  expanded: Set<string>;
  onToggle: (path: string) => void;
};

const FolderItem = (props: FolderItemProps) => {
  const path = () => `${props.parentPath}/${props.folder.name}`;
  const open = () => props.expanded.has(path());

  return (
    <li class={styles.treeFolder}>
      <button
        class={styles.sidebarFolder}
        onClick={() => props.onToggle(path())}
        title={props.folder.name}
      >
        <span class={styles.folderArrow} classList={{ [styles.open]: open() }}>
          ›
        </span>
        <span class={styles.sidebarLabel}>{props.folder.name}</span>
      </button>
      <Show when={open()}>
        <TreeList
          nodes={props.folder.children}
          parentPath={path()}
          selected={props.selected}
          onSelect={props.onSelect}
          expanded={props.expanded}
          onToggle={props.onToggle}
        />
      </Show>
    </li>
  );
};

export default Sidebar;
