/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        20: '20px',
        12: '12px',
        14: '14px',
        13: '13px',
      },
      borderRadius: {
        10: '10px',
      },
    },
  },
  plugins: [],
};
