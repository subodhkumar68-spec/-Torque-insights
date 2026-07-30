/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C8102E',      // Torque Primary Red
          slate: '#1E293B',    // Torque Secondary Dark Slate
          light: '#F8FAFC',    // Slate Light Background Accent
          gray: '#64748B',     // Gray Slate text
          pink: '#FFF1F2',     // Very light rose red background accent
          redhover: '#A50C22', // Hover state red
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'draw-line': 'drawLine 3s ease-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px rgba(200, 16, 46, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(200, 16, 46, 0.8))' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          '0%': { 'stroke-dashoffset': '100' },
          '100%': { 'stroke-dashoffset': '0' },
        }
      }
    },
  },
  plugins: [],
}
