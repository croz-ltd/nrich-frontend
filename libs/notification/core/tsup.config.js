const sharedConfig = require('@croz/nrich-tsup-config');
const tsup = require("tsup");

module.exports = tsup.defineConfig({
  ...sharedConfig,
  entry: {
    index: "src/index.ts",
  },
});
