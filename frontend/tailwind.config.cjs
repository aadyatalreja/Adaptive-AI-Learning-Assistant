/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "Inter", "sans-serif"]
      },
      colors: {
        base: {
          900: "#0f172a",
          800: "#1e293b"
        },
        accent: {
          indigo: "#6366f1",
          violet: "#a855f7",
          cyan: "#22d3ee"
        },
        primary: {
          50: "#e7f5ff",
          100: "#d0ebff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(2,6,23,0.45)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 18px 50px rgba(99,102,241,0.12)"
      }
    }
  },
  plugins: []
};

