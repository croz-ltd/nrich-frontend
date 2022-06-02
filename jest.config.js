module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
