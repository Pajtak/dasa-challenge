import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#000f40",

          secondary: "#fff",

          accent: "#ff4f33",

          neutral: "#6b7280",

          "base-100": "#ffffff",

          info: "#00d5ff",

          success: "#72a000",

          warning: "#ff7600",

          error: "#f50000",
          body: {
            "background-color": "#fff",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
