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

          // 50 (5(6)) Shades of Grey
          'ra-dark'       : '#181818',
          'ra-black'      : '#111111',
          'ra-dark-grey'  : '#1E1E1E',
          'ra-darker-grey': '#252525',
          'ra-middle-grey': '#333333',
          'ra-light-grey' : '#999999',

          //statuses
          'ra-online'  : '#8BC94E', 
          'ra-offline' : '#8A8A8A',
          'ra-joining' : '#2B88F5',
          'ra-queued'  : '#F23F42',
          'ra-afk'     : '#F0B132',
          'ra-unstable': '#B072E0',

          //red
          'ra-red'      : '#F0503A',
          'ra-dark-red' : '#C91F1F',
          'ra-light-red': '#E5484D',
          'ra-error-red': '#822025',

          //activities
          'ra-team-change'    : '#E2C55D',
          'ra-contact-receive': '#7C7CCA',

          //other
          'ra-yellow'     : '#F0CC7F',
          'ra-blue'       : '#45A5FF',
          'ra-light-green': '#8BC94E',
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
