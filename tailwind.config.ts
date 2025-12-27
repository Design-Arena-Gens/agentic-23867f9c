import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#e6edff",
          200: "#c2d4ff",
          300: "#97b6ff",
          400: "#6e97ff",
          500: "#4978ff",
          600: "#2656e6",
          700: "#1a41b3",
          800: "#122b80",
          900: "#09164d"
        }
      }
    }
  },
  plugins: []
};

export default config;
