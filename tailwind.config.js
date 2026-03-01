import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A5C1A',
        'primary-mid': '#2E7D1F',
        'primary-light': '#4CAF28',
        'accent': '#F5A000',
        'accent-hot': '#FF7A00',
        'bg': '#F5F7F2',
        'dark': '#0D2E0D',
        'text': '#1A1A1A',
        'mono': '#F5A000',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to top, #0D2E0D, rgba(26, 92, 26, 0.5), transparent)',
        'gradient-accent': 'radial-gradient(rgba(245, 160, 0, 0.25), transparent)',
        'gradient-card': 'linear-gradient(135deg, #2E7D1F, #F5A000)',
      }
    },
  },
  plugins: [typography],
}
