import type { Config } from 'tailwindcss';
import sharedConfig from '@jeiltodo/tailwind-config';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
  content: ['./src/**/*.tsx', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  plugins: [
    scrollbarHide, // tailwind-scrollbar-hide 플러그인 추가
  ],
};

export default config;
