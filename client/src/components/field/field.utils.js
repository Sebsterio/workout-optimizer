export const getIntensity = (intensity) => (intensity < 3 ? intensity : "3");
export const getRestLevel = (restLevel) => (restLevel < 3 ? restLevel : "3");

export const getCompletion = (details) => {
	if (!details) return null;

	const detailsDone = details.filter((entry) => entry.done);

	if (detailsDone.length === details.length) return "done";
	if (detailsDone.length > 0) return "partial";
	return "planned";
};

export const getDetailsString = (entry) =>
	Object.entries(entry)
		.filter((pair) => pair[0] !== "done")
		.map((pair) => {
			if (typeof pair[1] === "string" && pair[1].length > 5)
				return pair[1].substr(0, 4) + "...";
			if (pair[1] === true) return "Y";
			if (pair[1] === false) return "N";
			return pair[1];
		})
		.join("-");
