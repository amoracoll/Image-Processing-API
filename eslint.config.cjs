// eslint.config.cjs
const eslintPluginPrettier = require("eslint-plugin-prettier");
const eslintPluginTypescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
    },
    plugins: {
      prettier: eslintPluginPrettier,
      "@typescript-eslint": eslintPluginTypescript,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];
