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
          ivory: '#F8F6F2',      // Primary Background
          beige: '#EDE7DD',      // Secondary Surface
          charcoal: '#1F1F1F',   // Primary Text
          slate: '#5F5F5F',      // Secondary Text
          gold: '#C7A76C',       // Champagne Gold (Primary Accent)
          'gold-dark': '#9E7C42',// Antique Gold (Secondary Accent)
          stone: '#D7D0C5',      // Borders & Dividers
          sage: '#6F8F72',       // Success
          amber: '#C28B2C',      // Warning
          crimson: '#A33A3A',    // Error
          steel: '#5A7896',      // Info
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(31, 31, 31, 0.07)',
        'luxury-hover': '0 30px 60px -20px rgba(199, 167, 108, 0.15)',
        'gold-glow': '0 0 25px rgba(199, 167, 108, 0.25)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C7A76C 0%, #E8D3A7 50%, #9E7C42 100%)',
        'radial-spotlight': 'radial-gradient(circle at 50% 30%, rgba(248, 246, 242, 1) 0%, rgba(237, 231, 221, 0.8) 100%)',
      },
      letterSpacing: {
        'luxury': '0.15em',
        'widest-luxury': '0.25em',
      },
    },
  },
  plugins: [],
}
