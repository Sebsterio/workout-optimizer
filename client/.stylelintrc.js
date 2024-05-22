/** @type {import('stylelint').Config} */
module.exports = {
	root: true,
	cache: true,
	fix: false,
	extends: ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"],
	plugins: ["stylelint-scss", "stylelint-prettier"],
	overrides: [{ files: ["**/*.scss"], customSyntax: "postcss-scss" }],
	defaultSeverity: "warning",
	allowEmptyInput: true,
};
