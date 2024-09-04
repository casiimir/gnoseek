import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gray-nickel": {
          50: "#FCFCFC",
          100: "#F9F9F9",
          200: "#F0F1EF",
          300: "#E7E8E6",
          400: "#D6D7D3",
          500: "#C4C6C0",
          600: "#B0B2AD",
          700: "#767773",
          800: "#585956",
          900: "#3B3B3A",
        },
        "outer-space": {
          50: "#F5F5F5",
          100: "#EBEBEC",
          200: "#CDCECF",
          300: "#AFB1B2",
          400: "#747679",
          500: "#383B3F",
          600: "#323539",
          700: "#222326",
          800: "#191B1C",
          900: "#111213",
        },
        "pine-cone": {
          50: "#F7F7F6",
          100: "#F0EEEE",
          200: "#D9D6D4",
          300: "#C1BDBA",
          400: "#938B87",
          500: "#655953",
          600: "#5B504B",
          700: "#3D3532",
          800: "#2D2825",
          900: "#1E1B19",
        },
        asparagus: {
          50: "#f0f4ec",
          100: "#e1e9d9",
          200: "#c3d2b2",
          300: "#a5bc8c",
          400: "#87a565",
          500: "#698f3f",
          600: "#547232",
          700: "#3f5626",
          800: "#2a3919",
          900: "#151d0d",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
export default config;
