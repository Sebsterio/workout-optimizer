import {
	getLuminanceFromRgb,
	getRotatedRgb,
	getTemperaturFromRgb,
	getYiqFromRgb,
	hexToRgb,
	rgbToHex,
} from "utils/color";

const DEFAULTS = {
	yiqDarkThreshold: 128,
	lumDarkThreshold: 50,
	warmThreshold: 50,
	rotationComplementary: 180,
	rotationAnalogous: 30,
	colorDark: "black",
	colorBright: "white",
};

export const getVariants = ({ hex, rgb = hexToRgb(hex) }, config) => {
	const { colorDark, colorBright, ...rest } = { ...DEFAULTS, ...config };
	const { yiqDarkThreshold, lumDarkThreshold, warmThreshold } = rest;

	const yiq = getYiqFromRgb(rgb);
	const lum = getLuminanceFromRgb(rgb);
	const tem = getTemperaturFromRgb(rgb);

	const is = {
		dark: yiq < yiqDarkThreshold,
		dark_: lum < lumDarkThreshold,
		warm: tem > warmThreshold,
		saturated: undefined,
	};

	const [rounded, contrast] = is.dark ? [colorDark, colorBright] : [colorBright, colorDark];

	return {
		is,
		color: hex ?? rgbToHex(rgb),
		rounded,
		contrast,
	};
};

export const generatePalette = (baseHex, config) => {
	const { rotationComplementary, rotationAnalogous } = { ...DEFAULTS, ...config };

	const base = hexToRgb(baseHex);
	const comp = getRotatedRgb(base, rotationComplementary);
	const ana1 = getRotatedRgb(base, rotationAnalogous * -1);
	const ana2 = getRotatedRgb(base, rotationAnalogous);

	return {
		base: getVariants({ hex: baseHex, rgb: base }),
		complement: getVariants({ rgb: comp }),
		analogLeft: getVariants({ rgb: ana1 }),
		analogRight: getVariants({ rgb: ana2 }),
	};
};
