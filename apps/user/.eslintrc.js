module.exports = {
	extends: ['@jeiltodo/eslint-config/next.js'],
	rules: {
		'react/function-component-definition': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'eslint-disable tsdoc/syntax': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'react/jsx-no-leaked-render': 'off',
		'react/jsx-sort-props': 'off',
	},
};
