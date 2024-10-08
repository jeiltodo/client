// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@jeiltodo/tailwind-config';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Pick<
  Config,
  'mode' | 'content' | 'presets' | 'theme' | 'plugins'
> = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  presets: [sharedConfig],
  theme: {
    extend: {
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: '0', transform: 'translateY(-10px)' },
          '10%, 90%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 2s ease-in-out',
      },
    },
  },
  plugins: [
    scrollbarHide, // tailwind-scrollbar-hide 플러그인 추가
  ],
};

export default config;
