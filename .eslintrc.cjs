module.exports = {
  extends: [
    "@wildix/eslint-config-style-guide",
    "@wildix/eslint-config-style-guide/imports",
    // "@wildix/eslint-config-style-guide/react",
    // "@wildix/eslint-config-style-guide/react-hooks",
    "@wildix/eslint-config-style-guide/typescript",
    "@wildix/eslint-config-style-guide/prettier",
  ],
  ignorePatterns: ['dist', 'build', '.eslintrc.cjs', 'storybook-static'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // // Enforce a specific function type for function components
    // // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    // 'react/function-component-definition': [
    //   2,
    //   { namedComponents: ['arrow-function', 'function-expression', 'function-declaration'] },
    // ],
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'promise/prefer-await-to-then': 'warn',
    'require-await': 'warn',
    'no-return-await': 'warn',
    // 'react/require-default-props': 'warn',
    // 'react/jsx-no-constructed-context-values': 'warn',
    // 'react/hook-use-state': 'warn',
    // 'react/no-unused-prop-types': 'warn',
    // 'react-hooks/exhaustive-deps': 'warn',
    'no-use-before-define': 'warn',
    'id-length': 'warn',
    'no-fallthrough': 'warn',
    'no-useless-escape': 'warn',
  }
}
