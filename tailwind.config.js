/** @type {import('tailwindcss').Config} */
export default {
  // Tells Tailwind where your classes are used in your project.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Configuration for the 'container' class.
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  plugins: [],
};
