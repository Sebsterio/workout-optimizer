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

// TODO: compare these
export function getYiqFromRgb(rgb) {
	const [r, g, b] = getRgbArray(rgb);
	return (r * 299 + g * 587 + b * 114) / 1000;
}
export function getYiqFromRgb_1(rgb) {
	const [r, g, b] = getRgbArray(rgb);
	return Math.round((parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000);
}
// gamma: range 2.2--2.223 // exponent: large areas 0.33, tiny points 0.5 // [wR,wG,wB]: color luminance weights
export function getLuminanceFromRgb(
	rgb,
	{ wR = 0.2126, wG = 0.7152, wB = 0.0722, gamma = 2.2, exponent = 0.43 } = {}
) {
	const [r, g, b] = getRgbArray(rgb).map((c) => (c / 255.0) ** gamma);
	const Ylum = r * wR + g * wG + b * wB;
	return Math.pow(Ylum, exponent) * 100;
}
