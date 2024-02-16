export const getSavedPrograms = (state) => state.programs.saved;

export const getFetchedPrograms = (state) => state.programs.fetched;

export const getAreProgramsDownloading = (state) => state.programs.downloading;

export const getCurrentProgram = (state) => state.programs.saved[0];

export const getEditedProgram = (state) =>
	state.programs.saved.find((program) => program.id === state.programs.editing);

export const getCurrentProgramFields = (state) => state.programs.saved[0].fields;

export const getIsSaved = (state, program) =>
	state.programs.saved.some((savedProgram) => savedProgram.id === program.id);

export const getIsActivated = (state, program) => state.programs.saved[0].id === program.id;

export const getSavedProgramById = (state, id) =>
	state.programs.saved.find((program) => program.id === id);
