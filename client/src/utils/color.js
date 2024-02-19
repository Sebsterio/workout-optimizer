const DEFAULTS = {
	RGB_LUM: {
		weights: { r: 0.2126, g: 0.7152, b: 0.0722 },
		gamma: 2.2, // fine-tuning; sensible range: 2.18 - 2.223
		exponent: 0.43, // fine-tuning for size of compared areas - large: 0.33, tiny: 0.5
	},
};

// --- Helpers ---

const shortHexRegx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const hexSplitRegx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function getRgbArray(...args) {
	const rgb =
		args.length === 3 ? args : Array.isArray(args[0]) ? args[0] : [args[0].r, args[0].g, args[0].b];
	return rgb.every((c) => c >= 0 && c <= 255)
		? rgb
		: (console.error("Invalid rgb:", args), [0, 0, 0]);
}

// --- Conversion ---

export function hexToRgb(hex) {
	const hex6 = hex
		.substring(0, 7)
		.replace(shortHexRegx, (_, ...rgb) => rgb.map((c) => c + c).join(""));
	const hexArr = hexSplitRegx.exec(hex6) ?? (console.error("Invalid hex:", hex), []);
	const [_, r, g, b] = hexArr.map((val, i) => (i ? parseInt(val, 16) : 0)); // eslint-disable-line no-unused-vars
	return { r, g, b };
}

export function rgbToHex(rgb) {
	const [r, g, b] = getRgbArray(rgb);
	const hex = ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
	return "#" + hex;
}

// prettier-ignore
export function rgbToHsv(rgb) {
	const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255
	const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
	const s = max === 0 ? 0 : d / max, v = max;
	const h = { [min]: 0, [r]: (g - b) / d + (g < b ? 6 : 0), [g]: (b - r) / d + 2, [b]: (r - g) / d + 4 }[max]
		?? (console.error("Error in rgbToHsv", { rgb, max }), 0);

	return { h: h * 360 / 6, s: s * 100, v: v * 100 };
}

// prettier-ignore
/* eslint-disable no-sequences, no-unused-expressions */
export function hsvToRgb(hsv) {
	const h = hsv.h / 360, s = hsv.s / 100, v = hsv.v / 100; 
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	const [ r, g, b ] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6]
		?? (console.error("Error in hsvToRgb", { hsv, i }), [0, 0, 0]);

	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// --- Transforms ---

export function getYiqFromRgb(rgb, isTestVariant) {
	const [r, g, b] = getRgbArray(rgb);

	return !isTestVariant // TODO test the variant
		? (r * 299 + g * 587 + b * 114) / 1000
		: Math.round((parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000);
}

export function getLuminanceFromRgb(rgb, config) {
	const { gamma, exponent, weights } = { ...DEFAULTS.RGB_LUM, ...config };
	const { r: wR, g: wG, b: wB } = weights;
	const [r, g, b] = getRgbArray(rgb).map((c) => (c / 255.0) ** gamma);
	const Ylum = r * wR + g * wG + b * wB;
	return Math.pow(Ylum, exponent) * 100;
}

export function getGrayscaleFromRgb(rgb) {
	const [r, g, b] = getRgbArray(rgb);
	const mono8b = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	const grayHex = Math.round(mono8b).toString(16).padStart(2, "0");
	return "#" + grayHex.repeat(3);
}

export const getTemperaturFromRgb = () => null; /// TODO

export function rotateHue(hsv, deg) {
	let newHue = (hsv.h += deg);
	if (deg > 0 && newHue >= 360) newHue -= 360;
	if (deg < 0 && newHue < 0) newHue += 360;
	return { ...hsv, h: newHue };
}

export function getRotatedRgb(rgb, deg) {
	return hsvToRgb(rotateHue(rgbToHsv(rgb), deg));
}

// ---------------------------------------------------------------------

// export function darkenColor(rgb, percent) {
// 	let [red, green, blue] = rgb.replace('rgb(', '').replace(')', '').split(',');

// 	if (!red && !green && !blue) return 'rgb(100,100,100)';

// 	red = parseInt(red * (100 - percent) / 100, 10);
// 	green = parseInt(green * (100 - percent) / 100, 10);
// 	blue = parseInt(blue * (100 - percent) / 100, 10);

// 	return 'rgb(' + red + ', ' + green + ', ' + blue + ')';

// }
// export function brightenColor(rgb, percent) {
// 	let [red, green, blue] = rgb.replace('rgb(', '').replace(')', '').split(',');

// 	if (!red && !green && !blue) return 'rgb(100,100,100)';

// 	red = parseInt(red * (100 + percent) / 100, 10);
// 	green = parseInt(green * (100 + percent) / 100, 10);
// 	blue = parseInt(blue * (100 + percent) / 100, 10);

// 	return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
// }
