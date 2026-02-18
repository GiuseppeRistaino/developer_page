import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // <-- aggiunto

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      // ...tutto il resto del tuo extend
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    typography, // <-- aggiungi qui
  ],
} satisfies Config;
