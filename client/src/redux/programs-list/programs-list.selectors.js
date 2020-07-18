export const getIsActivated = (state, program) =>
	state.programsList.current === program.id;

export const getIsSaved = (state, program) =>
	state.programsList.all.some((programId) => programId === program.id);
