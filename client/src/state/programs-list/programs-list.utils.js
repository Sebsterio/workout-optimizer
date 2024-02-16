export const getConvertedLocalProgramsList = (getState) => {
	let { saved, dateModified } = getState().programs;
	return { saved: getProgramIds(saved), dateModified };
};

const getProgramIds = (programs) => programs.map((program) => program.id);
