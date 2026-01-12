export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          green: '#10b981', // emerald-400
          cyan: '#22d3ee',  // cyan-400
        }
      }
    },
  },
  plugins: [],
}