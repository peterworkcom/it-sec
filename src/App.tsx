import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { contentTree, searchFiles } from "./lib/content";
import type { FileNode } from "./lib/content";
import { renderMarkdown } from "./lib/markdown";
import { attachCopyButtons } from "./lib/copyButtons";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchView from "./components/SearchView/SearchView";
import Header from "./components/Header/Header";
import styles from "./App.module.css";

const App = () => {
  const [selected, setSelected] = createSignal<FileNode | null>(null);
  const [query, setQuery] = createSignal("");
  const results = createMemo(() => searchFiles(query()));

  const handleSelect = (file: FileNode) => {
    setSelected(file);
    setQuery("");
  };

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
            <h1 class={styles.contentTitle}>{selected()?.name}</h1>
            <div class={`${styles.markdownBody} markdown-body`} ref={mdRef} innerHTML={html()} />
          </main>
        </Show>
      </div>
    </div>
  );
};

export default App;
