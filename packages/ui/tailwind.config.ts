import type { Config } from 'tailwindcss';
import sharedConfig from '@jeiltodo/tailwind-config';

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'theme'> = {
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { backgroundPosition: 'left 0px bottom -60px' },
          '100%': { backgroundPosition: 'left 1500px bottom 10px' },
        },
      },
      animation: {
        wave: 'wave 4s linear infinite',
      },
    },
  },
};

export default config;
