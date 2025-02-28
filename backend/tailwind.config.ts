import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
      },
    },
  },
  plugins: [],
};

export default config; 