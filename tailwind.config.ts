import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-green": "#1B5E20",
        "light-green": "#C8EFCA",
        "near-black": "#111111",
        cream: "#F5F0E4",
        "dark-grey": "#4A4A4A",
        "mid-grey": "#9E9E9E",
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        "barlow-condensed": ["Barlow Condensed", "sans-serif"],
        lalezar: ["Lalezar", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
