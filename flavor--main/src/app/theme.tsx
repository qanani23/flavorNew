import React, { createContext, useContext, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("fc-theme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
      if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {}
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("fc-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border border-[var(--border-color)] hover:border-[var(--primary)] bg-[var(--bg-surface)] hover:bg-[var(--primary)] text-[var(--text-main)] hover:text-[var(--primary-fg)] shadow-xs active:scale-95 ${className}`}
    >
      {isDark ? (
        <Sun size={15} className="text-[#FFB84D] hover:text-[var(--primary-fg)] transition-transform rotate-0 duration-300" />
      ) : (
        <Moon size={15} className="text-[#B8860B] hover:text-[var(--primary-fg)] transition-transform -rotate-12 duration-300" />
      )}
    </button>
  );
};

export default ThemeProvider;
