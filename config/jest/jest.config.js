module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  preset: "ts-jest",
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/dist/", "/test/", "/node_modules/"],
  coverageReporters: ["json", "html"],
};
