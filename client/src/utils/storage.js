const KEY_PREFIX = "app_";

export const createStorage = (storage, key, defaultValue = "null") => ({
	get: () => JSON.parse(storage.getItem(KEY_PREFIX + key) ?? defaultValue),
	set: (d) => storage.setItem(KEY_PREFIX + key, JSON.stringify(d)),
	clear: () => storage.removeItem(KEY_PREFIX + key),
});
