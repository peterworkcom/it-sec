import { createSignal, For } from "solid-js";
import styles from "./ThemeSwitcher.module.css";

type ThemeId = "default" | "ghost" | "zerg";

const themes: { id: ThemeId; label: string; color: string }[] = [
  { id: "default", label: "Default", color: "#aa3bff" },
  { id: "ghost", label: "Ghost", color: "#39d353" },
  { id: "zerg", label: "Zerg", color: "#e8720c" },
];

const applyTheme = (id: ThemeId) => {
  if (id === "default") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", id);
  }
  localStorage.setItem("theme", id);
};

const saved = (localStorage.getItem("theme") as ThemeId | null) ?? "default";
applyTheme(saved);

const ThemeSwitcher = () => {
  const [active, setActive] = createSignal<ThemeId>(saved);

  const select = (id: ThemeId) => {
    setActive(id);
    applyTheme(id);
  };

  return (
    <div class={styles.switcher}>
      <For each={themes}>
        {(t) => (
          <button
            class={styles.btn}
            classList={{ [styles.active]: active() === t.id }}
            style={`--dot-color: ${t.color}`}
            title={t.label}
            onClick={() => select(t.id)}
          >
            <span class={styles.dot} />
            {t.label}
          </button>
        )}
      </For>
    </div>
  );
};

export default ThemeSwitcher;
