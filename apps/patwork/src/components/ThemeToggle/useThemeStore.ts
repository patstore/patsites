import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
}

const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
};

const useThemeStore = create<ThemeStore>((set) => ({
    theme: "light",
    toggleTheme: (theme: Theme) =>
        set(() => {
            applyTheme(theme);
            return { theme };
        })
}));

export default useThemeStore;
