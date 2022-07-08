const sharedConfig = require('../../../config/jest/jest.config.js');

module.exports = {
  ...sharedConfig,
  setupFiles: ["../../../config/jest/jest.setup-fetch.js"],
  setupFilesAfterEnv: ["../../../config/jest/jest.setup-jest-dom.js"],
  coverageDirectory: "../../../coverage/libs/form-configuration/core",
};
