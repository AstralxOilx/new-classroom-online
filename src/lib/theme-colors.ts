

const themes = {
    Blue: {
        light: {
            background: "0 0% 100%",
            foreground: "222.2 84% 4.9%",
            card: "0 0% 100%",
            cardForeground: "222.2 84% 4.9%",
            popover: "0 0% 100%",
            popoverForeground: "222.2 84% 4.9%",
            primary: "221.2 83.2% 53.3%",
            primaryForeground: "210 40% 98%",
            secondary: "210 40% 96.1%",
            secondaryForeground: "222.2 47.4% 11.2%",
            muted: "210 40% 96.1%",
            mutedForeground: "215.4 16.3% 46.9%",
            accent: "210 40% 96.1%",
            accentForeground: "222.2 47.4% 11.2%",
            destructive: "0 84.2% 60.2%",
            destructiveForeground: "210 40% 98%",
            border: "214.3 31.8% 91.4%",
            input: "214.3 31.8% 91.4%",
            ring: "221.2 83.2% 53.3%",
            radius: "0.5rem",
        },
        dark: {
            background: "222.2 84% 4.9%",
            foreground: "210 40% 98%",
            card: "222.2 84% 4.9%",
            cardForeground: "210 40% 98%",
            popover: "222.2 84% 4.9%",
            popoverForeground: "210 40% 98%",
            primary: "217.2 91.2% 59.8%",
            primaryForeground: "222.2 47.4% 11.2%",
            secondary: "217.2 32.6% 17.5%",
            secondaryForeground: "210 40% 98%",
            muted: "217.2 32.6% 17.5%",
            mutedForeground: "215 20.2% 65.1%",
            accent: "217.2 32.6% 17.5%",
            accentForeground: "210 40% 98%",
            destructive: "0 62.8% 30.6%",
            destructiveForeground: "210 40% 98%",
            border: "217.2 32.6% 17.5%",
            input: "217.2 32.6% 17.5%",
            ring: "224.3 76.3% 48%",
        },
    },
    Zinc: {
        light: {
          background: "0 0% 100%",
          foreground: "240 10% 3.9%",
          card: "0 0% 100%",
          cardForeground: "240 10% 3.9%",
          popover: "0 0% 100%",
          popoverForeground: "240 10% 3.9%",
          primary: "240 5.9% 10%",
          primaryForeground: "0 0% 98%",
          secondary: "240 4.8% 95.9%",
          secondaryForeground: "240 5.9% 10%",
          muted: "240 4.8% 95.9%",
          mutedForeground: "240 3.8% 46.1%",
          accent: "240 4.8% 95.9%",
          accentForeground: "240 5.9% 10%",
          destructive: "0 84.2% 60.2%",
          destructiveForeground: "0 0% 98%",
          border: "240 5.9% 90%",
          input: "240 5.9% 90%",
          ring: "240 5.9% 10%",
          radius: "0.5rem",
        },
        dark: {
          background: "240 10% 3.9%",
          foreground: "0 0% 98%",
          card: "240 10% 3.9%",
          cardForeground: "0 0% 98%",
          popover: "240 10% 3.9%",
          popoverForeground: "0 0% 98%",
          primary: "0 0% 98%",
          primaryForeground: "240 5.9% 10%",
          secondary: "240 3.7% 15.9%",
          secondaryForeground: "0 0% 98%",
          muted: "240 3.7% 15.9%",
          mutedForeground: "240 5% 64.9%",
          accent: "240 3.7% 15.9%",
          accentForeground: "0 0% 98%",
          destructive: "0 62.8% 30.6%",
          destructiveForeground: "0 0% 98%",
          border: "240 3.7% 15.9%",
          input: "240 3.7% 15.9%",
          ring: "240 4.9% 83.9%",
        },
      },
};

export default function setGlobalColorTheme(
    themeMode: "light" | "dark",
    color: ThemeColors,
) {
   
    const theme = themes[color][themeMode] as {
        [key: string]: string;
    }

    for (const key in theme) {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
}