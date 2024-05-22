// NOTE: `.eslintrc.*` format is deprecated in favor of eslint.config.*
// However, the VS Code extension expects a .eslintrc file
// To enable it, set `ESLINT_USE_FLAT_CONFIG=false` in .env (untracked)

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	root: true,
	env: { browser: true, node: true, es2021: true },
	extends: ["react-app", "plugin:prettier/recommended"],
	plugins: ["react", "prettier"],
	rules: {
		"prettier/prettier": "warn",
		"no-sequences": "off",
		"no-unused-vars": [
			"warn",
			{ argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
		],
	},
	reportUnusedDisableDirectives: true,
};
