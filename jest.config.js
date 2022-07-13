module.exports = {
  projects: [
    "<rootDir>/demo",
    "<rootDir>/libs/notification/core",
    "<rootDir>/libs/notification/mui",
    "<rootDir>/libs/form-configuration/core",
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/dist/", "/test/", "/node_modules/"],
  coverageReporters: ["json", "html"],
};
