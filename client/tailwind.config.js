/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          darker: 'var(--space-darker)',
          dark: 'var(--space-dark)',
          card: 'var(--space-card)',
        },
        neon: {
          cyan: '#22D3EE',
          sky: '#38BDF8',
          electric: '#0EA5E9',
        },
        flame: {
          orange: '#F59E0B',
          DEFAULT: '#FB923C',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        border: {
          cyan: 'var(--border-cyan)',
        }
      },
      backgroundImage: {
        'gradient-cyan-blue': 'linear-gradient(to right, #22D3EE, #0EA5E9)',
        'gradient-space': 'radial-gradient(circle at top, #11172A 0%, #0B1022 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.3)',
        'glow-cyan-lg': '0 0 25px rgba(34, 211, 238, 0.5)',
        'glow-orange': '0 0 15px rgba(245, 158, 11, 0.3)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
