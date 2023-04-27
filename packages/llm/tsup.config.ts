import { defineConfig } from "tsup";

const tsupConfig = defineConfig({
  entry: ["./src/index.ts"],
  outDir: "dist",
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  shims: true,
  legacyOutput: false,
  bundle: true,
  splitting: true,
});

// eslint-disable-next-line import/no-default-export
export default tsupConfig;
