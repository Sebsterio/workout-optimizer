import { createContext, useContext, useState } from "react";
import { getAnalogousColors, getAntiColor, getComplementaryColor, getRoundedColor } from "./helpers";
import { hexToRgb, rgbToHex } from "utils/color";

import { createStorage } from "utils/storage";
import { gradients } from "./gradients";

const themeStorage = createStorage(localStorage, "theme-id", "0");

const getPaletteProps = ({ hex, rgb }, preset) => ({
	color: preset?.color ?? hex ?? rgbToHex(rgb),
	inverse: preset?.inverse ?? getAntiColor(rgb),
	rounded: preset?.rounded ?? getRoundedColor(rgb), // TEMP
});

const useThemeState = () => {
	const [bgId, setBgId] = useState(themeStorage.get() ?? "0");
	const setBgIdPersisted = (id) => (themeStorage.set(id), setBgId(id)); // eslint-disable-line no-sequences

	const { name, gradient, color: baseHex, ...scheme } = gradients[bgId];

	const baseRgb = hexToRgb(baseHex);
	const complementRgb = getComplementaryColor(baseRgb);
	const [analogLeftRgb, analogRightRgb] = getAnalogousColors(baseRgb);

	const palette = {
		base: getPaletteProps({ hex: baseHex, rgb: baseRgb }, scheme.base),
		comp: getPaletteProps({ rgb: complementRgb }, scheme.comp),
		analogL: getPaletteProps({ rgb: analogLeftRgb }, scheme.analogL),
		analogR: getPaletteProps({ rgb: analogRightRgb }, scheme.analogR),
	};

	// shouldn't bg be assigned by theme?
	const cssVars = {
		"--background-color": palette.base.color,
		"--background-image": gradient,
	};

	return { palette, gradient, cssVars, bgName: name, bgId, setBgId: setBgIdPersisted };
};

// ----------------------------------------------------------------------------

const initialContext = {};
const ThemeContext = createContext(initialContext);
ThemeContext.displayName = "ThemeContext";

export const ThemeProvider = (props) => {
	return <ThemeContext.Provider value={useThemeState()} {...props} />;
};

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (context === initialContext) throw new Error("useThemeContext must be used within a ThemeContextProvider");
	return context;
};
