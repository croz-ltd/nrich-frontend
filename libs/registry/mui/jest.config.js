const sharedConfig = require('@croz/nrich-jest-config');

module.exports = {
  ...sharedConfig,
  setupFiles: ["@croz/nrich-jest-config/jest.setup-fetch.js"],
  setupFilesAfterEnv: ["@croz/nrich-jest-config/jest.setup-jest-dom.js"],
  coverageDirectory: "../../../coverage/libs/registry/mui",
  collectCoverageFrom: ["./src/**"]
};
