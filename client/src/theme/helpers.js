import { getYiqFromRgb, hsvToRgb, rgbToHsv } from "utils/color";

function getRotatedColor(rgb, deg) {
	const hsv = rgbToHsv(rgb);
	let newHue = (hsv.h += deg);
	if (deg > 0 && newHue >= 360) newHue -= 360;
	if (deg < 0 && newHue < 0) newHue += 360;
	return hsvToRgb({ ...hsv, h: newHue });
}

export function getComplementaryColor(rgb) {
	return getRotatedColor(rgb, 180);
}

export function getAnalogousColors(rgb, deg = 30) {
	return [getRotatedColor(rgb, deg), getRotatedColor(rgb, -deg)];
}

function getIsDark(rgb, yiqThreshold = 128) {
	return getYiqFromRgb(rgb) < yiqThreshold;
}

// TODO: adjust brightness or saturation ... sometimes too much contrast

export function getAntiColor(rgb, { colorDark = "black", colorBright = "white" } = {}) {
	return getIsDark(rgb) ? colorBright : colorDark;
}
export function getRoundedColor(rgb, { colorDark = "black", colorBright = "white" } = {}) {
	return getIsDark(rgb) ? colorDark : colorBright;
}
