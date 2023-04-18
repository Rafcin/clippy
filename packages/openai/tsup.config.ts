import { defineConfig } from "tsup";
import RawPlugin from "esbuild-plugin-raw";

const tsupConfig = defineConfig({
  entryPoints: ["./src/**"],
  format: ["cjs", "esm"],
  outDir: "./dist",
  dts: true,
  clean: false,
  minify: true,
  silent: false,
  sourcemap: true,
  splitting: false,
  treeshake: false,
  esbuildPlugins: [RawPlugin()],
});

// eslint-disable-next-line import/no-default-export
export default tsupConfig;
