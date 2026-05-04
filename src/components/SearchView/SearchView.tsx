import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import type { FileNode } from "../../lib/content";
import { hasContent } from "../../lib/content";
import { renderMarkdown } from "../../lib/markdown";
import { attachCopyButtons } from "../../lib/copyButtons";
import styles from "./SearchView.module.css";

type SearchViewProps = {
  query: string;
  onQuery: (q: string) => void;
  results: FileNode[];
  onSelect: (file: FileNode) => void;
};

const SearchView = (props: SearchViewProps) => (
  <div class={styles.searchView}>
    <div class={styles.searchViewInner}>
      <Show
        when={hasContent}
        fallback={
          <p class={styles.noContent}>
            There is no content. Add <code>.md</code> files to <code>content</code> to get started.
          </p>
        }
      >
        <div class={styles.searchHero}>
          <input
            type="search"
            class={styles.searchMain}
            placeholder="Search notes…"
            value={props.query}
            onInput={(e) => props.onQuery(e.currentTarget.value)}
            autofocus
          />
          <Show when={!props.query.trim()}>
            <p class={styles.searchHint}>
              Search across all notes, or pick a file from the sidebar.
            </p>
          </Show>
        </div>

        <Show when={props.query.trim()}>
          <div class={styles.searchResultsList}>
            <Show
              when={props.results.length > 0}
              fallback={<p class={styles.noResults}>No results for "{props.query}"</p>}
            >
              <For each={props.results}>
                {(file) => <SearchCard file={file} onOpen={props.onSelect} />}
              </For>
            </Show>
          </div>
        </Show>
      </Show>
    </div>
  </div>
);

type CardProps = {
  file: FileNode;
  onOpen: (file: FileNode) => void;
};

const SearchCard = (props: CardProps) => {
  const [expanded, setExpanded] = createSignal(false);
  let mdRef: HTMLDivElement | undefined;

  const breadcrumb = createMemo(() =>
    props.file.path.replace("/content/", "").split("/").slice(0, -1).join(" › "),
  );

  const html = createMemo(() => (expanded() ? renderMarkdown(props.file.content) : ""));

  createEffect(() => {
    html();
    queueMicrotask(() => {
      if (mdRef) attachCopyButtons(mdRef);
    });
  });

  return (
    <div class={styles.searchCard} classList={{ [styles.expanded]: expanded() }}>
      <div class={styles.searchCardHeader} onClick={() => setExpanded((e) => !e)}>
        <div class={styles.searchCardTitle}>
          <span class={styles.searchCardName}>{props.file.name}</span>
          <span class={styles.searchCardPath}>{breadcrumb()}</span>
        </div>
        <div class={styles.searchCardActions}>
          <button
            class={styles.cardOpenBtn}
            onClick={(e) => {
              e.stopPropagation();
              props.onOpen(props.file);
            }}
          >
            Open
          </button>
          <span class={styles.cardArrow} classList={{ [styles.open]: expanded() }}>
            ›
          </span>
        </div>
      </div>
      <Show when={expanded()}>
        <div class={`${styles.searchCardBody} markdown-body`} ref={mdRef} innerHTML={html()} />
      </Show>
    </div>
  );
};

export default SearchView;
