import { standardProgram } from "redux/program/standardProgram";

// TODO: remove
export const getStateWithRemovedProgram = (array, itemToRemove) =>
	array.filter((item) => item.id !== itemToRemove.id);

// ---------------------------- Conversion ------------------------------

// Sort according to programs-list (skip current program)
// Insert standard program where programId===null
export const convertRemotePrivatePrograms = (programs, getState) => {
	const { all, current } = getState().programsList;
	return all
		.filter((programId) => programId !== current)
		.map((programId) =>
			programId === "standard"
				? programs.find((program) => program.id === programId)
				: convertLocalProgram(standardProgram)
		);
};

export const getConvertedLocalCurrentProgram = (getState) =>
	convertLocalProgram(getState().program);

export const convertLocalProgram = (program) => ({
	...program,
	fields: JSON.stringify(program.fields),
});

export const convertRemoteProgram = (program) => {
	const newProgram = {
		...program,
		fields: JSON.parse(program.fields),
	};
	return newProgram;
};
