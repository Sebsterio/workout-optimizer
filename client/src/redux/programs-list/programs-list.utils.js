export const getConvertedLocalProgramsList = (getState) => {
	const current = getState().program.id;
	const saved = getProgramIds(getState().programs.saved);
	const { dateModified } = getState().programsList;
	return { current, saved, dateModified };
};

const getProgramIds = (programs) => programs.map((program) => program.id);
