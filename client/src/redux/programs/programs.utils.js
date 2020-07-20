import { standardProgram } from "redux/program/standardProgram";

// TODO: remove
export const getStateWithRemovedProgram = (array, itemToRemove) =>
	array.filter((item) => item.id !== itemToRemove.id);

// ---------------------------- Conversion ------------------------------

export const convertRemotePrograms = (programs) => {
	return programs.map((program) => convertRemoteProgram(program));
};

export const convertRemoteProgram = (program) => {
	if (program === "standard") return standardProgram;
	return {
		...program,
		fields: JSON.parse(program.fields),
	};
};

export const getConvertedLocalCurrentProgram = (getState) =>
	convertLocalProgram(getState().program);

export const convertLocalProgram = (program) => ({
	...program,
	fields: JSON.stringify(program.fields),
});
