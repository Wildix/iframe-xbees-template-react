module.exports = {
  root: true,
  extends: [
    "@wildix/eslint-config-style-guide",
    "@wildix/eslint-config-style-guide/react",
    "@wildix/eslint-config-style-guide/react-hooks",
    "@wildix/eslint-config-style-guide/typescript",
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Enforce a specific function type for function components
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-expression', 'function-declaration'] },
    ],
    'react/hook-use-state': [
      "warn",
    ],
  },
  ignorePatterns: ["build", "storybook-static"]
}
