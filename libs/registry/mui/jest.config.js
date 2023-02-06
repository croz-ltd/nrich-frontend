const sharedConfig = require('@croz/nrich-jest-config');

module.exports = {
  ...sharedConfig,
  setupFilesAfterEnv: ["@croz/nrich-jest-config/jest.setup-jest-dom.js"],
  coverageDirectory: "../../../coverage/libs/registry/mui",
  collectCoverageFrom: ["./src/**"]
};
