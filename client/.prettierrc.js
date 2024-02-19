/** @type {import("prettier").Config} */
const config = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	singleQuote: false,
	jsxSingleQuote: false,
	trailingComma: "es5",
	endOfLine: "auto",
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderParserPlugins: ["jsx"],
	plugins: ["@trivago/prettier-plugin-sort-imports"],
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^(components|containers|routes|state|static|theme|utils)(?:/.*)?$",
		"^assets(?:/.*)?$",
		"^[.][.]/(?!(.*)[.]s?css$).*$",
		"^[.]/(?!(.*)[.]s?css$).*$",
		"[.]s?css$",
	],
};

module.exports = config;
