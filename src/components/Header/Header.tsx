import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styles from "./Header.module.css";

type HeaderProps = {
  onHome: () => void;
};

const Header = (props: HeaderProps) => (
  <header class={styles.header}>
    <button class={styles.homeBtn} onClick={props.onHome}>
      Home
    </button>
    <ThemeSwitcher />
  </header>
);

export default Header;
