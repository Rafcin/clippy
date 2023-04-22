import { defineConfig } from "tsup";

const tsupConfig = defineConfig({
  entryPoints: ["./src/index.tsx", "./src/styles.ts"],
  format: ["cjs", "esm"],
  outDir: "./dist",
  dts: true,
  clean: false,
  minify: true,
  silent: false,
  sourcemap: true,
  splitting: false,
  treeshake: false,
  shims: true,
});

// eslint-disable-next-line import/no-default-export
export default tsupConfig;
