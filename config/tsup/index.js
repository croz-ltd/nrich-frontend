const tsup = require("tsup");

module.exports = tsup.defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  dts: true,
  external: "react",
  format: ["cjs", "esm"],
});
