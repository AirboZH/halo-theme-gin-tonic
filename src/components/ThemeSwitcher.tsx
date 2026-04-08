import { useEffect, useState } from "react";
import MingcuteMoonLine from "~icons/mingcute/moon-line";
import MingcuteSunLine from "~icons/mingcute/sun-line";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <button
      className="inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[8px] border-none bg-transparent p-0 text-[var(--ink-2)] transition-colors duration-150 ease-in-out hover:bg-[var(--bg-raised)] hover:text-[var(--ink)]"
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      {isDark ? <MingcuteSunLine /> : <MingcuteMoonLine />}
    </button>
  );
}
