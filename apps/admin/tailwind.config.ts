import type { Config } from 'tailwindcss';
import sharedConfig from '@jeiltodo/tailwind-config';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/**/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  presets: [sharedConfig],
  plugins: [
    scrollbarHide, // tailwind-scrollbar-hide 플러그인 추가
  ],
};

export default config;
