/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:n8n-nodes-base/nodes',
		'plugin:n8n-nodes-base/credentials',
		'prettier',
	],
	env: {
		node: true,
		es2022: true,
	},
	ignorePatterns: [
		'node_modules/',
		'dist/',
		'*.js',
		'!.eslintrc.js',
		'gulpfile.js',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/no-unsafe-call': 'warn',
		'@typescript-eslint/no-unsafe-return': 'warn',
		'@typescript-eslint/restrict-template-expressions': 'warn',
		'n8n-nodes-base/node-class-description-credentials-name-unsuffixed': 'off',
		'n8n-nodes-base/node-class-description-display-name-unsuffixed-trigger-node': 'off',
		'n8n-nodes-base/node-param-description-excess-final-period': 'off',
		'n8n-nodes-base/node-param-description-unencoded-angle-brackets': 'off',
		'n8n-nodes-base/node-param-description-url-missing-protocol': 'off',
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'prefer-const': 'error',
		'no-var': 'error',
		'eqeqeq': ['error', 'always'],
		'curly': ['error', 'all'],
	},
	overrides: [
		{
			files: ['**/*.test.ts', '**/*.spec.ts'],
			env: {
				jest: true,
			},
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
			},
		},
	],
};
