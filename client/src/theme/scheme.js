import { schemes as blueprints } from "static/schemes";

const generateId = ({ seed, name }) => [...name.toLowerCase().split(" "), seed].join("-");
const generateFallback = ({ seed }) => (Array.isArray(seed) ? seed[0] : seed);
const decorateBlueprint = (s) => ({ ...s, id: generateId(s), fallback: generateFallback(s) });
const warn = (label) => console.error(`Scheme "${label}" not found`);

export const schemes = blueprints.map(decorateBlueprint);

export const getScheme = (id) => schemes.find((s) => s.id === id) ?? (warn(id), schemes[0]);

export const getDefaultSchemeId = () =>
	(schemes.find((s) => s.isDefault) ?? (warn("default"), schemes[0])).id;
