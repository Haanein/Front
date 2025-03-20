/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ✅ Ensure it scans the `src/` folder
  theme: {
    backgroundColor: {
      darkblue: "#1E2636",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
