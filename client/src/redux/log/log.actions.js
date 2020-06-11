import logActionTypes from "./log.types";

import { openModal } from "../modal/modal.actions";

export const addLog = (data) => ({
	type: logActionTypes.ADD_LOG,
	payload: data,
});

// export const removeLog = (data) => ({
// 	type: logActionTypes.ADD_LOG,
// 	payload: data,
// });

export const removeFromLog = (data) => ({
	type: logActionTypes.ADD_LOG,
	payload: data,
});

// ----------------- Thunk ------------------

export const addEntry = (data) => (dispatch) => {
	//
	// TODO: POST to DB
	//
	// const { level } = props
	// if (level === 0) dispatch(removeFromLog(props))

	dispatch(addLog(data));
};

export const newEntry = (props) => (dispatch) => {
	const isFuture = props.dateOffset > 0;
	if (isFuture) dispatch(addEntry({ ...props, level: "plan" }));
	else dispatch(openModal(props));
};
