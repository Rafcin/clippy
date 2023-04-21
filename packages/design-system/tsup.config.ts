import { defineConfig } from "tsup";

const external = ["react"];
const tsupConfig = defineConfig({
  entryPoints: ["./src/index.tsx", "./src/styles.ts"],
  format: ["cjs", "esm"],
  inject: ["./src/react-shim.js"],
  outDir: "./dist",
  external,
  dts: true,
  clean: false,
  minify: true,
  silent: false,
  sourcemap: true,
  splitting: false,
  treeshake: false,
});

// eslint-disable-next-line import/no-default-export
export default tsupConfig;
