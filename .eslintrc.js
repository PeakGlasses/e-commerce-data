// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // Include this if you"re using TypeScript
    "plugin:prettier/recommended", // Integrate Prettier into ESLint
  ],
  parser: "@typescript-eslint/parser", // Use @typescript-eslint/parser for TypeScript support
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "off", // Shows Prettier errors as ESLint errors
    "react/react-in-jsx-scope": "off", // Disable for React 17+ (new JSX transform)
    "@typescript-eslint/no-unused-vars": "warn", // Example: show unused variables as a warning
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
