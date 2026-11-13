import { useEffect, useState } from "react";

const STORAGE_KEY = "tvstg-theme";

function currentTheme(): "light" | "dark" {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") {
    return explicit;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const sync = () => setTheme(currentTheme());
    sync();
    window.addEventListener("tvstg-theme", sync);
    return () => window.removeEventListener("tvstg-theme", sync);
  }, []);

  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
    window.dispatchEvent(new Event("tvstg-theme"));
  };

  return (
    <button
      type="button"
      className="btn-choice square theme-toggle"
      aria-pressed={theme === "dark"}
      aria-label={theme === "dark" ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren"}
      onClick={toggle}
    >
      {theme === "dark" ? "Hell" : "Dunkel"}
    </button>
  );
}
