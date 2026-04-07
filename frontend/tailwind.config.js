/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0b10', // Deep dark navy
        surface: 'rgba(20, 24, 39, 0.65)', // Glassmorphism surface
        surfaceBorder: 'rgba(56, 189, 248, 0.15)',
        primary: '#38bdf8', // Neon blue / Cyan
        secondary: '#0ea5e9',
        accent: '#2dd4bf', // Teal accent
        danger: '#fb7185', // Red anomaly
        success: '#34d399', // Green safe
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(20, 24, 39, 0.8) 0%, rgba(10, 11, 16, 0.8) 100%)',
      },
    },
  },
  plugins: [],
}
