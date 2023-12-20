/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mulish: ['Mulish', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      urbanist: ['Urbanist', 'sans-serif']
    },
    extend: {
      colors: {
        'primary-orange': '#FEA013',
        'primary-orange-muted': '#69563A',
        'primary-orange-hover': '#BA4A0C',
        'primary-red': '#D23131',
        'neutral-dark': '#222222',
        'neutral-light': '#2D2D2D',
        'content-disabled': "#707070",
        'content-1': '#F8F8F8',
        'content-2': '#CBCBCB',
        'content-3': '#999999',
        'content-4': '#707070',
        'outline': '#494949'
      }
    },
  },
  plugins: [],
}

