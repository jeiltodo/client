import { defineConfig } from 'tsup';
import svgr from 'esbuild-plugin-svgr';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  // dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  shims: true,

  esbuildPlugins: [svgr()],
});
