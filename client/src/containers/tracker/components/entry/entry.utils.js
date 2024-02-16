export const getIntensity = (intensity) => (intensity < 3 ? intensity : "3");

export const getRestLevelStyles = (restLevel) => ({
	"--background-width-multiplier": restLevel.initial,
	"--background-pos-x-multiplier": restLevel.initial - restLevel.today,
});

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
			// Pick program parameters that are present in log entry (a set)
			.filter((param) => entryParams.includes(param.label))
			// Exclude 'done' param
			.filter((param) => param.label !== "done")
			// Map program params into corresponding log entry values
			.map((param) => entry[param.label])
			// Abbreviate etc.
			.map((value) => {
				if (typeof value === "string" && value.length > 5) return value.substr(0, 4) + "...";
				if (value === true) return "Y";
				if (value === false) return "N";
				return value;
			})
			.join("-")
	);
};
