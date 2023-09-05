import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    createThemes(
      {
        dark: {
          'ra-primary'      : '#5A74FE',
          'ra-primary-hover': '#6C84FF',

          'ra-white': '#ffffff',
          
          'ra-black'      : '#111111',
          'ra-dark'       : '#181818',
          'ra-grey'       : '#111111',
          'ra-dark-grey'  : '#1E1E1E',
          'ra-middle-grey': '#333333',

          'ra-red': '#F0503A',
        },
        light: {
          'ra-primary'      : '#5A74FE',
          'ra-primary-hover': '#6C84FF',

          'ra-white': '#000000',

          'ra-black'      : '#fcfcfc',
          'ra-dark'       : '#E7E7E7',
          'ra-grey'       : '#f5f5f5',
          'ra-dark-grey'  : '#f5f5f5',
          'ra-middle-grey': '#CCCCCC',

          'ra-red': '#F0503A',
        },
      },
      { cssVariablePrefix: 'rac-' },
    ),
  ],
  theme: {
    extend: {
      boxShadow: {
        spread: '0px 0px 25px',
        middle: '0px 2px 11px',
        strong: '0px 4px 30px 0px',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
};
