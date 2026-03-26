/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f6ff',
          500: '#2563eb',
        }
      },
    },
    container: {
      center: true,
      padding: '1rem',
    }
  },
  plugins: [],
}
