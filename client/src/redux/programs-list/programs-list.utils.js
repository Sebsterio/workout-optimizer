export const getConvertedLocalProgramsList = (getState) => {
	const current = getState().program.id;
	const saved = getState().programs.saved;
	const { dateUpdated } = getState().programsList;
	return { current, saved, dateUpdated };
};
