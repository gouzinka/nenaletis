import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-linear": "linear-gradient(92.29deg,#ff62fa,#ff74f4)",
        "gradient-linear-hover": "linear-gradient(92.29deg,#ff74f4,#ff62fa)",
        primary: "linear-gradient(0deg,#d3eaf8,#bfdef2)",
      },
      colors: {
        error: "#fa426a",
        primary: "#0f1849",
        secondary: "#4433ff",
        tertiary: "#d3eaf8",
      },
    },
  },
  plugins: [],
};

export default config;
