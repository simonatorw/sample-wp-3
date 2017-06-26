module.exports = {
	parser: 'babel-eslint',
	plugins: ['react', 'import'],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: [
		'eslint:recommended', 
		'plugin:react/recommended',
		'plugin:import/errors', 
		'plugin:import/warnings'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always']
	}
};