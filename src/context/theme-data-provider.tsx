"use client";
import setGlobalColorTheme from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorsStateParams>(
    {} as ThemeColorsStateParams,
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
    const getSavedThemeColors = () => {
        try {
            return (localStorage.getItem("themeColor") as ThemeColors) || "Zinc";
        } catch (error) {
            "Zinc" as ThemeColors;
        }
    };

    const [themeColor, setThemeColor] = useState<ThemeColors>(
        getSavedThemeColors() as ThemeColors,
    );

    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        localStorage.setItem("themeColor", themeColor);
        setGlobalColorTheme(theme as "light" | "dark", themeColor);

        if (!isMounted) {
            setIsMounted(true);
        }
    }, [themeColor, theme]);

    if (!isMounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );

}

export function useThemeContext() {
    return useContext(ThemeContext);
}