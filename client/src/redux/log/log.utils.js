// ---------------------- reducer utils ------------------------

const getEntryPropNames = ({ dateStr, field, stats }) => ({
	entryName: dateStr.replace(/ /g, "_"),
	fieldName: field.name,
	stats,
});

export const getUpdatedEntries = (state, payload) => {
	const { entryName, fieldName, stats } = getEntryPropNames(payload);
	const entries = { ...state.entries };

	// Remove entry
	if (stats === "DELETE") {
		delete entries[entryName][fieldName];
		const isEmpty = Object.keys(entries[entryName]).length === 0;
		if (isEmpty) delete entries[entryName];
	}
	// Add entry
	else {
		entries[entryName] = {
			...entries[entryName],
			[fieldName]: stats,
		};
	}

	return entries;
};

// ---------------------- db conversion ------------------------

// Convert single local log entry for export to db
export const convertLocalEntry = (entryName, entryValue) => ({
	dateStr: entryName.split("_").join(" "),
	content: JSON.stringify(entryValue),
});

// Convert all local log entries for export to db
export const convertLocalEntries = (entries) =>
	Object.entries(entries).map((entry) => convertLocalEntry(entry[0], entry[1]));

// Convert imported remote log entries
export const convertRemoteEntries = (entries) => {
	const newEntries = {};
	entries.forEach((entry) => {
		const entryName = entry.dateStr.replace(/ /g, "_");
		const content = JSON.parse(entry.content);
		newEntries[entryName] = content;
	});
	return newEntries;
};
