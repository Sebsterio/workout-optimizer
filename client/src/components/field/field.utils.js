export const getCompletion = (details) => {
	if (!details) return null;

	const detailsDone = details.filter((entry) => entry.done);

	if (detailsDone.length === details.length) return "done";
	if (detailsDone.length > 0) return "partial";
	return "planned";
};
