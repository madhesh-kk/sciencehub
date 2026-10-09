/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm earthy palette with burnt orange accent
        terra: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        sand: {
          50: '#fdfcfb',
          100: '#faf7f5',
          200: '#f5f0eb',
          300: '#ede6dc',
          400: '#e3d5c3',
          500: '#d4bfa6',
          600: '#c0a582',
          700: '#a88d6d',
          800: '#8c7456',
          900: '#5d4e3a',
        },
        olive: {
          50: '#f6f7f4',
          100: '#eceee6',
          200: '#d9ddc9',
          300: '#c0c8a6',
          400: '#a7b181',
          500: '#8c9a5f',
          600: '#6f7c49',
          700: '#5a633b',
          800: '#4a5232',
          900: '#3d432b',
        },
        burnt: {
          50: '#fef6f3',
          100: '#fde9e1',
          200: '#fbd5c7',
          300: '#f7b89f',
          400: '#f29066',
          500: '#eb6f3d',
          600: '#d85423',
          700: '#b4411a',
          800: '#93381b',
          900: '#79321c',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
