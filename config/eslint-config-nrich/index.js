module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "turbo",
    "airbnb",
    "airbnb-typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  rules: {
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true
      }
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function"
      }
    ],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true
      }
    ],
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        avoidEscape: true
      }
    ],
    "@typescript-eslint/brace-style": [
      "error",
      "stroustrup"
    ],
    "max-len": [
      "error",
      200
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc"
        },
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "react.*",
            group: "builtin",
            position: "before"
          },
          {
            pattern: "@croz/**",
            group: "internal",
            position: "after"
          },
          {
            pattern: "@mui/**",
            group: "external",
            position: "after"
          }
        ],
        pathGroupsExcludedImportTypes: [
          "react.*",
          "@croz/**",
          "@mui/**"
        ],
        groups: [
          "builtin",
          "external",
          "internal",
          [
            "parent",
            "sibling"
          ],
          "index"
        ]
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ]
  },
  ignorePatterns: [
    "dist",
    "build",
    "node_modules",
    ".eslintrc.js",
    "jest.config.js",
    "tsup.config.js",
    "index.js"
  ]
}
