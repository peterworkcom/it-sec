import { createEffect, createMemo, createSignal, onCleanup, Show } from "solid-js";
import { contentTree, fileToSlug, findFileBySlug, searchFiles } from "./lib/content";
import type { FileNode } from "./lib/content";
import { renderMarkdown } from "./lib/markdown";
import { attachCopyButtons } from "./lib/copyButtons";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchView from "./components/SearchView/SearchView";
import Header from "./components/Header/Header";
import styles from "./App.module.css";

const fileFromUrl = (): FileNode | null => {
  const slug = new URLSearchParams(window.location.search).get("file");
  return slug ? (findFileBySlug(slug) ?? null) : null;
};

const App = () => {
  const [selected, setSelected] = createSignal<FileNode | null>(fileFromUrl());
  const [query, setQuery] = createSignal("");
  const results = createMemo(() => searchFiles(query()));

  const syncUrl = (file: FileNode | null) => {
    const url = new URL(window.location.href);
    if (file) url.searchParams.set("file", fileToSlug(file.path));
    else url.searchParams.delete("file");
    const next = url.pathname + url.search + url.hash;
    if (next !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.pushState({}, "", next);
    }
  };

  const handleSelect = (file: FileNode) => {
    setSelected(file);
    setQuery("");
    syncUrl(file);
  };

  const onPopState = () => setSelected(fileFromUrl());
  window.addEventListener("popstate", onPopState);
  onCleanup(() => window.removeEventListener("popstate", onPopState));

  const html = createMemo(() => {
    const file = selected();
    return file ? renderMarkdown(file.content) : "";
  });

  let mdRef: HTMLDivElement | undefined;

  createEffect(() => {
    html();
    queueMicrotask(() => {
      if (mdRef) attachCopyButtons(mdRef);
    });
  });

  return (
    <div class={styles.app}>
      <Sidebar
        tree={contentTree}
        selected={selected()?.path ?? null}
        onSelect={handleSelect}
        searchQuery={query()}
        onSearchQuery={setQuery}
        searchResults={results()}
      />
      <div class={styles.main}>
        <Header
          onHome={() => {
            setSelected(null);
            setQuery("");
            syncUrl(null);
          }}
        />
        <Show
          when={selected()}
          fallback={
            <SearchView
              query={query()}
              onQuery={setQuery}
              results={results()}
              onSelect={handleSelect}
            />
          }
        >
          <main class={styles.content}>
            <h1 class={styles.contentTitle}>{`${selected()?.name}.md`}</h1>
            <div class={`${styles.markdownBody} markdown-body`} ref={mdRef} innerHTML={html()} />
          </main>
        </Show>
      </div>
    </div>
  );
};

export default App;
