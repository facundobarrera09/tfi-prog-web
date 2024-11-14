import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkturquoise: "#00ced1",
        paleturquoise: "#afeeee",
        customred: "#ff0000"
      },
      boxShadow: {
        'border': "0px 0px 2px 0px rgba(0,0,0,0.75)",
        'border-bottom': "0px 1px 2px -1px rgba(0, 0, 0, 0.75)",
        'card': "0px 1px 4px 0px rgba(0, 0, 0, 0.75)"
      }
    },
  },
  plugins: [],
};
export default config;
