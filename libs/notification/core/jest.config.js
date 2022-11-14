const sharedConfig = require('@croz/nrich-jest-config');

module.exports = {
  ...sharedConfig,
  setupFiles: ["@croz/nrich-jest-config/jest.setup-fetch.js"],
  coverageDirectory: "../../../coverage/libs/notification/core",
  collectCoverageFrom: ["./src/**"]
};
