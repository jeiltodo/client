// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@jeiltodo/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/**/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  presets: [sharedConfig],
};

export default config;
