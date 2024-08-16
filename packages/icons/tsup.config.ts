import { defineConfig } from 'tsup';
import svgr from 'esbuild-plugin-svgr';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: ['react'],
  outDir: 'dist',
  dts: true,

  splitting: true,
  sourcemap: true,
  clean: true,
  // shims: true,

  esbuildPlugins: [
    svgr({ titleProp: true, ref: true, expandProps: false, typescript: true }),
  ],
});
