const tsup = require("tsup");

module.exports = tsup.defineConfig({
  sourcemap: true,
  clean: true,
  dts: true,
  external: "react",
  format: ["cjs", "esm"],
});
