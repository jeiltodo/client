// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@jeiltodo/tailwind-config';


const config: Pick<Config,  "mode" | "content" | "presets"> = {
  mode: 'jit',
  content: [ "./src/**/*.{js,ts,jsx,tsx}", "./public/index.html", ],
  presets: [sharedConfig],
};

export default config;
