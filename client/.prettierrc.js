/** @type {import("prettier").Config} */
module.exports = {
	root: true,
	plugins: ["@trivago/prettier-plugin-sort-imports"],

	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	singleQuote: false,
	jsxSingleQuote: false,
	trailingComma: "es5",
	endOfLine: "auto",
	arrowParens: "always",

	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderParserPlugins: ["jsx"],
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^(components|containers|routes|state|static|theme|utils)(?:/.*)?$",
		"^assets(?:/.*)?$",
		"^[.][.]/(?!(.*)[.]s?css$).*$",
		"^[.]/(?!(.*)[.]s?css$).*$",
		"[.]s?css$",
	],
};
