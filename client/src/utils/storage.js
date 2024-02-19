import { useCallback, useRef, useState } from "react";

const KEY_PREFIX = "app: ";

export const createStorage = (storage, key) => ({
	get: () => JSON.parse(storage.getItem(KEY_PREFIX + key) ?? "null"),
	set: (d) => storage.setItem(KEY_PREFIX + key, JSON.stringify(d)),
	clear: () => storage.removeItem(KEY_PREFIX + key),
});

// ----------------------------------------------------------------------------

const useStorage = (storage, key) => {
	const ref = useRef(createStorage(storage, key));
	return { ref, ...ref.current };
};

const usePersistedState = (storage_, key, defaultValue) => {
	// * In case of race conditions:
	// const { ref: storageRef } = useStorage(storage_, key);
	// const [state, setState] = useState(storageRef.current.get() ?? defaultValue);
	// const setPersisted = useCallback((id) => (storageRef.current.set(id), setState(id)), [setState]);

	const storage = useStorage(storage_, key);
	const [state, setState] = useState(() => storage.get() ?? defaultValue);

	const setPersisted = useCallback(
		(id) => (storage.set(id), setState(id)),
		[setState] // eslint-disable-line react-hooks/exhaustive-deps
	);

	return [state, setPersisted];
};

export const useLocalState = (key, defaultValue) => {
	return usePersistedState(localStorage, key, defaultValue);
};

export const useSessionState = (key, defaultValue) => {
	return usePersistedState(sessionStorage, key, defaultValue);
};
