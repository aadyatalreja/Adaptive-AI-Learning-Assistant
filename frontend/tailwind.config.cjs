/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "Inter", "sans-serif"]
      },
      colors: {
        primary: {
          50: "#e7f5ff",
          100: "#d0ebff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.45)"
      }
    }
  },
  plugins: []
};

