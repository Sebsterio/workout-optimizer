export const getIsSaved = (state, program) =>
	state.programs.saved.some((savedProgram) => savedProgram.id === program.id);
