/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: "#fffbf0",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#f59e0b",
                    600: "#d97706",
                    700: "#b45309",
                    800: "#92400e",
                    900: "#78350f",
                    950: "#451a03",
                },
                primary: "#f59e0b",
                secondary: "#d97706",
                accent: "#fbbf24",
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
            },
            boxShadow: {
                "golden-glow": "0 0 15px rgba(245, 158, 11, 0.4)",
                "golden-glow-lg": "0 0 30px rgba(245, 158, 11, 0.5)",
                "golden-glow-xl": "0 0 50px rgba(245, 158, 11, 0.6)",
            },
            backgroundImage: {
                "golden-gradient":
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)",
                "golden-gradient-dark":
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)",
            },
        },
    },
    plugins: [],
};
