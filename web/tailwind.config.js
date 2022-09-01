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
        25: '25px',
        15: '15px',
      },
      borderRadius: {
        10: '10px',
        5: '5px',
      },
      backgroundColor: {
        f1: '#f1f1f1',
        primary: '#ffec44',
      },
      color: {
        primary: '#ffec44',
      },
      margin: {
        19: '19px',
        30: '30px',
        11: '11px',
      },
    },
  },
  plugins: [],
};
