type ThemeColors = "Zinc" | "Blue" 
interface ThemeColorsStateParams{
    themeColor: ThemeColors;
    setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>
}
