export const getConvertedLocalProgramsList = (getState) => {
	const current = getState().program.id;
	const saved = getProgramIds(getState().programs.saved);
	const { dateUpdated } = getState().programsList;
	return { current, saved, dateUpdated };
};

const getProgramIds = (programs) => programs.map((program) => program.id);
