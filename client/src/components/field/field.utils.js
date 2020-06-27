export const getIntensity = (intensity) => (intensity < 3 ? intensity : "3");
export const getRestLevel = (restLevel) => (restLevel < 3 ? restLevel : "3");

export const getCompletion = (details) => {
	if (!details) return null;

	const detailsDone = details.filter((entry) => entry.done);

	if (detailsDone.length === details.length) return "done";
	if (detailsDone.length > 0) return "partial";
	return "planned";
};

export const getDetailsString = (entry, field) => {
	const entryParams = Object.keys(entry);
	return (
		field.details
			// Pick protocol parameters that are present in log entry (a set)
			.filter((param) => entryParams.includes(param.label))
			// Exclude 'done' param
			.filter((param) => param.label !== "done")
			// Map protocol params into corresponding log entry values
			.map((param) => entry[param.label])
			// Abbreviate etc.
			.map((value) => {
				if (typeof value === "string" && value.length > 5)
					return value.substr(0, 4) + "...";
				if (value === true) return "Y";
				if (value === false) return "N";
				return value;
			})
			.join("-")
	);
};
