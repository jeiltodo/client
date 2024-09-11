module.exports = {
  extends: ['@jeiltodo/eslint-config/react.js'],
  rules: {
    // 모든 린트 규칙 비활성화
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'react/jsx-boolean-value': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
    'no-unsafe-return': 'off',
    'no-cycle': 'off',
    'no-undef': 'off',
    'no-empty': 'off',
    'no-redeclare': 'off',
    'no-nested-ternary': 'off',
    'no-implicit-coercion': [
      'error',
      {
        allow: ['!!'],
      },
    ],
    'unicorn/filename-case': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'jsx-a11y/no-autofocus': 'off',
  },
};
