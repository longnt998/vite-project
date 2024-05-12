/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'headline-l': ['2rem', '40px'], //32px, 40px
        'body-xxs': ['0.625rem', 1.6], //10px, 16px
        'body-l': ['1.25rem', '24px'], //20px, 24px
        'body-m': ['1.125rem', '24px'], //18px, 24px
        'body-s': ['1rem', 1.5], //16px, 24px
        'body-xs': ['0.875rem', '18px'], //14px, 16px
      },
      colors: {
        current: 'currentcolor',
        'main-color': '#000000',
        main: {
          primary: {
            25: '#F5FCFF',
            50: '#EAF9FF',
            75: '#C7EDFE',
            100: '#90D7F7',
            200: '#5BC4F4',
            300: '#36ACE1',
            400: '#1BA0DD',
            500: '#0095D9',
            600: '#0089C6',
            700: '#007DB3',
            800: '#00597B',
            850: '#003AFF',
            900: '#EEEEEE',
            950: '#2A09CF',
          },
        },
        gray: {
          25: '#F8F8F8',
          50: '#F3F3F4',
          75: '#ECECED',
          100: '#E2E2E4',
          200: '#D9D8DC',
          250: '#D1D5DB',
          300: '#C6C5CA',
          400: '#B3B1B8',
          450: '#F7F7F7',
          500: '#8D8A95',
          600: '#676472',
          700: '#4F4B5C',
          800: '#4B535C',
          900: '#666666',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#B1B5B8',
          70: '#A5A5A5',
          75: '#1B1B1B',
          80: '#111111',
          90: '#0C1722',
          100: '#000000',
          150: '#8A9295',
          200: '#6B7280',
        },
      },
    },
    plugins: [],
  }
}
