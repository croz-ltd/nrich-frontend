import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  dts: true,
  external: "react",
  format: ["cjs", "esm"],
});
