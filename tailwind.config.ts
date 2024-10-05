import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A5ACD', // Slate Blue
        hover: '#A3B3E0 ',
        secondary: '#E6E6FA', // Lavender
        background: '#DCDCDC', // Light Taupe
        highlight: '#98FB98', // Soft Mint
        textPrimary: '#333333', // Dark Gray for primary text
        textSecondary: '#AAAAAA', // Light Gray for secondary text
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
