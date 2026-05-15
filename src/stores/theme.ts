import { defineStore } from "pinia";

export interface ThemeColors {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    radius: string;
    // Sidebar
    sidebarBackground: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarPrimaryForeground: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;
}

export interface Theme {
    id: string;
    name: string;
    description: string;
    isDark: boolean;
    colors: ThemeColors;
}

export const themes: Theme[] = [
    {
        id: "emerald-luxury",
        name: "Emerald Luxury",
        description: "Deep emerald and burnished gold for a premium feel.",
        isDark: true,
        colors: {
            background: "160 84% 5%",
            foreground: "160 20% 98%",
            card: "160 84% 8%",
            cardForeground: "160 20% 98%",
            popover: "160 84% 6%",
            popoverForeground: "160 20% 98%",
            primary: "160 84% 30%",
            primaryForeground: "0 0% 100%",
            secondary: "160 30% 15%",
            secondaryForeground: "160 20% 98%",
            muted: "160 30% 12%",
            mutedForeground: "160 20% 60%",
            accent: "45 93% 50%",
            accentForeground: "160 84% 5%",
            destructive: "0 84% 60%",
            destructiveForeground: "0 0% 100%",
            border: "160 84% 15%",
            input: "160 84% 15%",
            ring: "160 84% 30%",
            radius: "0.75rem",
            sidebarBackground: "160 84% 8%",
            sidebarForeground: "160 20% 98%",
            sidebarPrimary: "45 93% 50%",
            sidebarPrimaryForeground: "160 84% 8%",
            sidebarAccent: "160 84% 12%",
            sidebarAccentForeground: "160 20% 98%",
            sidebarBorder: "160 84% 12%",
            sidebarRing: "45 93% 50%",
        }
    },
    {
        id: "dracula",
        name: "Dracula",
        description: "Classic vampire-inspired dark theme with vibrant accents.",
        isDark: true,
        colors: {
            background: "231 15% 18%",
            foreground: "60 30% 96%",
            card: "231 15% 22%",
            cardForeground: "60 30% 96%",
            popover: "231 15% 20%",
            popoverForeground: "60 30% 96%",
            primary: "326 100% 74%", // Pink
            primaryForeground: "231 15% 18%",
            secondary: "231 15% 25%",
            secondaryForeground: "60 30% 96%",
            muted: "231 15% 23%",
            mutedForeground: "231 10% 70%",
            accent: "265 89% 78%", // Purple
            accentForeground: "231 15% 18%",
            destructive: "0 100% 67%", // Red
            destructiveForeground: "231 15% 18%",
            border: "231 15% 30%",
            input: "231 15% 30%",
            ring: "265 89% 78%",
            radius: "0.5rem",
            sidebarBackground: "231 15% 15%",
            sidebarForeground: "60 30% 96%",
            sidebarPrimary: "326 100% 74%",
            sidebarPrimaryForeground: "231 15% 15%",
            sidebarAccent: "231 15% 20%",
            sidebarAccentForeground: "60 30% 96%",
            sidebarBorder: "231 15% 20%",
            sidebarRing: "326 100% 74%",
        }
    },
    {
        id: "midnight-blue",
        name: "Midnight Blue",
        description: "Professional deep blue and cool cyan palette.",
        isDark: true,
        colors: {
            background: "222 47% 11%",
            foreground: "213 31% 91%",
            card: "222 47% 15%",
            cardForeground: "213 31% 91%",
            popover: "222 47% 13%",
            popoverForeground: "213 31% 91%",
            primary: "199 89% 48%", // Cyan
            primaryForeground: "222 47% 11%",
            secondary: "222 47% 20%",
            secondaryForeground: "213 31% 91%",
            muted: "222 47% 18%",
            mutedForeground: "215 20% 65%",
            accent: "217 91% 60%", // Blue
            accentForeground: "210 40% 98%",
            destructive: "0 84% 60%",
            destructiveForeground: "210 40% 98%",
            border: "222 47% 25%",
            input: "222 47% 25%",
            ring: "217 91% 60%",
            radius: "0.5rem",
            sidebarBackground: "222 47% 8%",
            sidebarForeground: "213 31% 91%",
            sidebarPrimary: "199 89% 48%",
            sidebarPrimaryForeground: "222 47% 8%",
            sidebarAccent: "222 47% 12%",
            sidebarAccentForeground: "213 31% 91%",
            sidebarBorder: "222 47% 12%",
            sidebarRing: "199 89% 48%",
        }
    },
    {
        id: "classic-light",
        name: "Classic Light",
        description: "Clean and minimal light theme.",
        isDark: false,
        colors: {
            background: "0 0% 100%",
            foreground: "222 47% 11%",
            card: "0 0% 100%",
            cardForeground: "222 47% 11%",
            popover: "0 0% 100%",
            popoverForeground: "222 47% 11%",
            primary: "222 47% 11%",
            primaryForeground: "210 40% 98%",
            secondary: "210 40% 96%",
            secondaryForeground: "222 47% 11%",
            muted: "210 40% 96%",
            mutedForeground: "215 16% 46%",
            accent: "210 40% 96%",
            accentForeground: "222 47% 11%",
            destructive: "0 84% 60%",
            destructiveForeground: "210 40% 98%",
            border: "214 31% 91%",
            input: "214 31% 91%",
            ring: "222 47% 11%",
            radius: "0.5rem",
            sidebarBackground: "220 13% 95%",
            sidebarForeground: "222 47% 11%",
            sidebarPrimary: "221 83% 53%",
            sidebarPrimaryForeground: "0 0% 100%",
            sidebarAccent: "214 31% 88%",
            sidebarAccentForeground: "222 47% 11%",
            sidebarBorder: "214 31% 88%",
            sidebarRing: "222 47% 11%",
        }
    },
    {
        id: "rose-garden",
        name: "Rose Garden",
        description: "Warm rose and blush tones with a soft, elegant feel.",
        isDark: false,
        colors: {
            background: "0 0% 99%",
            foreground: "340 10% 18%",
            card: "0 0% 100%",
            cardForeground: "340 10% 18%",
            popover: "0 0% 100%",
            popoverForeground: "340 10% 18%",
            primary: "346 77% 49%",
            primaryForeground: "0 0% 100%",
            secondary: "346 30% 93%",
            secondaryForeground: "340 10% 18%",
            muted: "346 25% 93%",
            mutedForeground: "340 8% 50%",
            accent: "21 90% 56%",
            accentForeground: "0 0% 100%",
            destructive: "0 84% 60%",
            destructiveForeground: "0 0% 100%",
            border: "346 25% 88%",
            input: "346 25% 88%",
            ring: "346 77% 49%",
            radius: "0.75rem",
            sidebarBackground: "346 30% 95%",
            sidebarForeground: "340 10% 18%",
            sidebarPrimary: "346 77% 49%",
            sidebarPrimaryForeground: "0 0% 100%",
            sidebarAccent: "346 25% 88%",
            sidebarAccentForeground: "340 10% 18%",
            sidebarBorder: "346 20% 86%",
            sidebarRing: "346 77% 49%",
        }
    },
    {
        id: "ocean-breeze",
        name: "Ocean Breeze",
        description: "Cool teal and seafoam for a fresh, airy workspace.",
        isDark: false,
        colors: {
            background: "195 25% 97%",
            foreground: "200 50% 12%",
            card: "195 15% 99%",
            cardForeground: "200 50% 12%",
            popover: "195 15% 99%",
            popoverForeground: "200 50% 12%",
            primary: "175 84% 32%",
            primaryForeground: "0 0% 100%",
            secondary: "190 30% 92%",
            secondaryForeground: "200 50% 12%",
            muted: "190 25% 93%",
            mutedForeground: "200 20% 45%",
            accent: "199 89% 46%",
            accentForeground: "0 0% 100%",
            destructive: "0 84% 60%",
            destructiveForeground: "0 0% 100%",
            border: "190 30% 86%",
            input: "190 30% 86%",
            ring: "175 84% 32%",
            radius: "0.5rem",
            sidebarBackground: "200 35% 92%",
            sidebarForeground: "200 50% 12%",
            sidebarPrimary: "175 84% 32%",
            sidebarPrimaryForeground: "0 0% 100%",
            sidebarAccent: "190 30% 85%",
            sidebarAccentForeground: "200 50% 12%",
            sidebarBorder: "190 25% 82%",
            sidebarRing: "175 84% 32%",
        }
    },
    {
        id: "high-contrast",
        name: "High Contrast",
        description: "Pure black and white for maximum clarity.",
        isDark: true,
        colors: {
            background: "0 0% 0%",
            foreground: "0 0% 100%",
            card: "0 0% 0%",
            cardForeground: "0 0% 100%",
            popover: "0 0% 0%",
            popoverForeground: "0 0% 100%",
            primary: "0 0% 100%",
            primaryForeground: "0 0% 0%",
            secondary: "0 0% 10%",
            secondaryForeground: "0 0% 100%",
            muted: "0 0% 15%",
            mutedForeground: "0 0% 70%",
            accent: "0 0% 100%",
            accentForeground: "0 0% 0%",
            destructive: "0 100% 50%",
            destructiveForeground: "0 0% 100%",
            border: "0 0% 100%",
            input: "0 0% 100%",
            ring: "0 0% 100%",
            radius: "0px",
            sidebarBackground: "0 0% 0%",
            sidebarForeground: "0 0% 100%",
            sidebarPrimary: "0 0% 100%",
            sidebarPrimaryForeground: "0 0% 0%",
            sidebarAccent: "0 0% 20%",
            sidebarAccentForeground: "0 0% 100%",
            sidebarBorder: "0 0% 100%",
            sidebarRing: "0 0% 100%",
        }
    }
];

export const useThemeStore = defineStore("theme", {
    state: () => ({
        currentThemeId: localStorage.getItem("themeId") || "emerald-luxury",
    }),
    
    getters: {
        currentTheme: (state) => themes.find(t => t.id === state.currentThemeId) || themes[0],
    },
    
    actions: {
        setTheme(themeId: string) {
            this.currentThemeId = themeId;
            localStorage.setItem("themeId", themeId);
            this.applyCurrentTheme();
        },
        
        init() {
            this.applyCurrentTheme();
        },
        
        applyCurrentTheme() {
            const theme = this.currentTheme;
            const root = document.documentElement;
            
            // Set dark class
            if (theme.isDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
            
            // Set individual CSS variables
            const colorMap: Record<string, string> = {
                "--background": theme.colors.background,
                "--foreground": theme.colors.foreground,
                "--card": theme.colors.card,
                "--card-foreground": theme.colors.cardForeground,
                "--popover": theme.colors.popover,
                "--popover-foreground": theme.colors.popoverForeground,
                "--primary": theme.colors.primary,
                "--primary-foreground": theme.colors.primaryForeground,
                "--secondary": theme.colors.secondary,
                "--secondary-foreground": theme.colors.secondaryForeground,
                "--muted": theme.colors.muted,
                "--muted-foreground": theme.colors.mutedForeground,
                "--accent": theme.colors.accent,
                "--accent-foreground": theme.colors.accentForeground,
                "--destructive": theme.colors.destructive,
                "--destructive-foreground": theme.colors.destructiveForeground,
                "--border": theme.colors.border,
                "--input": theme.colors.input,
                "--ring": theme.colors.ring,
                "--radius": theme.colors.radius,
                // Sidebar
                "--sidebar-background": theme.colors.sidebarBackground,
                "--sidebar-foreground": theme.colors.sidebarForeground,
                "--sidebar-primary": theme.colors.sidebarPrimary,
                "--sidebar-primary-foreground": theme.colors.sidebarPrimaryForeground,
                "--sidebar-accent": theme.colors.sidebarAccent,
                "--sidebar-accent-foreground": theme.colors.sidebarAccentForeground,
                "--sidebar-border": theme.colors.sidebarBorder,
                "--sidebar-ring": theme.colors.sidebarRing,
            };
            
            Object.entries(colorMap).forEach(([prop, value]) => {
                root.style.setProperty(prop, value);
            });
        }
    }
});
