import { createContext, useContext } from "react";

import { deepMerge } from "utils/object";
import { useLocalState } from "utils/storage";

import { generatePalette } from "./palette";
import { getDefaultSchemeId, getScheme } from "./scheme";

const THEME_STORAGE_KEY = "theme";

const createCssVars = (palette, gradient) => ({
	"--background-color": palette.base.color,
	"--background-image": gradient,
});

const useThemeState = () => {
	const [themeId, setThemeId] = useLocalState(THEME_STORAGE_KEY, getDefaultSchemeId());

	const { seed, background, ...scheme } = getScheme(themeId);
	const baseHex = Array.isArray(seed) ? seed[0] : seed;
	const palette = generatePalette(baseHex, scheme);
	const _palett = deepMerge(palette, scheme);
	const cssVars = createCssVars(palette, background);

	return {
		...{ scheme: { seed, background, ...scheme }, palette, cssVars },
		...{ id: themeId, setId: setThemeId },
	};
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
	if (context === initialContext)
		throw new Error("useThemeContext must be used within ThemeContextProvider");
	return context;
};
