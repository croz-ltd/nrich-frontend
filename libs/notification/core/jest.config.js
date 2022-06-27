const sharedConfig = require('../../../config/jest/jest.config.js');

module.exports = {
  ...sharedConfig,
  setupFiles: ["../../../config/jest/jest.setup-fetch.js"],
  coverageDirectory: "../../../coverage/libs/notification/core",
};
