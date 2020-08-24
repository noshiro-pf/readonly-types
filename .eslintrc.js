module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:functional/recommended",
    "plugin:functional/external-recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:total-functions/recommended",
  ],
  env: {
    "jest/globals": true,
    es6: true,
    browser: true
  },
  plugins: ["jest", "sonarjs", "functional", "@typescript-eslint", "prettier", "total-functions"],
  rules: {
    // Additional rules that are not part of `eslint:recommended`.
    // See https://eslint.org/docs/rules/
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-await-in-loop": "error",
    "no-new-wrappers": "error",
    "eqeqeq": "error",
    "no-caller": "error",
    "require-unicode-regexp": "error",
    "no-loss-of-precision": "error",
    // Make typescript-eslint rules more aggressive.
    "@typescript-eslint/consistent-type-assertions": ["error", {
      "assertionStyle": "never"
    }],
    "@typescript-eslint/strict-boolean-expressions": ["error", {
      "allowString": false,
      "allowNumber": false,
      "allowNullableObject": false
    }],
    // Interfaces encourage OO, types encourage FP.
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    // Require unknown type annotation in catch blocks.
    "@typescript-eslint/no-implicit-any-catch": "error",
    // Don't need this given consistent-type-assertions bans type assertions entirely.
    "total-functions/no-unsafe-type-assertion": 0
  }
};
