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
        "custom-bg-primary": "var(--bg-primary)",
        "custom-border-primary": "var(--border-primary)",
        "custom-text-primary": "var(--text-primary)",
        "custom-text-secondary": "var(--text-secondary)",
        "custom-bg-button": "var(--bg-button)",
        "custom-text-button": "var(--text-button)",
        "custom-bg-card": "var(--bg-card)",
        "custom-border-card": "var(--border-card)",
        "custom-bg-footer": "var(--bg-footer)",
        "custom-text-footer": "var(--text-footer)",
        "custom-bg-header": "var(--bg-header)",
        "custom-text-header": "var(--text-header)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
