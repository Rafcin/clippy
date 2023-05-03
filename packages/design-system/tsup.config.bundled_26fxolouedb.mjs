// tsup.config.ts
import { defineConfig } from "tsup";
var tsupConfig = defineConfig({
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
  shims: true
});
var tsup_config_default = tsupConfig;
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvcmFmL0Rlc2t0b3AvY2xpcHB5L3BhY2thZ2VzL2Rlc2lnbi1zeXN0ZW0vdHN1cC5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL2hvbWUvcmFmL0Rlc2t0b3AvY2xpcHB5L3BhY2thZ2VzL2Rlc2lnbi1zeXN0ZW1cIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL2hvbWUvcmFmL0Rlc2t0b3AvY2xpcHB5L3BhY2thZ2VzL2Rlc2lnbi1zeXN0ZW0vdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidHN1cFwiO1xuXG5jb25zdCB0c3VwQ29uZmlnID0gZGVmaW5lQ29uZmlnKHtcbiAgZW50cnlQb2ludHM6IFtcIi4vc3JjL2luZGV4LnRzeFwiLCBcIi4vc3JjL3N0eWxlcy50c1wiXSxcbiAgZm9ybWF0OiBbXCJjanNcIiwgXCJlc21cIl0sXG4gIG91dERpcjogXCIuL2Rpc3RcIixcbiAgZHRzOiB0cnVlLFxuICBjbGVhbjogZmFsc2UsXG4gIG1pbmlmeTogdHJ1ZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgc291cmNlbWFwOiB0cnVlLFxuICBzcGxpdHRpbmc6IGZhbHNlLFxuICB0cmVlc2hha2U6IGZhbHNlLFxuICBzaGltczogdHJ1ZSxcbn0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgZGVmYXVsdCB0c3VwQ29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLG9CQUFvQjtBQUV4VCxJQUFNLGFBQWEsYUFBYTtBQUFBLEVBQzlCLGFBQWEsQ0FBQyxtQkFBbUIsaUJBQWlCO0FBQUEsRUFDbEQsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLFFBQVE7QUFBQSxFQUNSLEtBQUs7QUFBQSxFQUNMLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLE9BQU87QUFDVCxDQUFDO0FBR0QsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K