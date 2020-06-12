import logActionTypes from "./log.types";

import { openModal } from "../modal/modal.actions";

const addLog = (data) => ({
	type: logActionTypes.ADD_LOG,
	payload: data,
});

const removeLog = (data) => ({
	type: logActionTypes.REMOVE_LOG,
	payload: data,
});

// ----------------- Thunk ------------------

export const addEntry = (data) => (dispatch) => {
	//
	// TODO: POST to DB
	//
	const { level } = data;
	if (level === 0) dispatch(removeLog(data));
	// TODO: only addLog if different than current
	else dispatch(addLog(data));
};

export const newEntry = (props) => (dispatch) => {
	const isFuture = props.dateOffset > 0;
	if (isFuture) dispatch(addEntry({ ...props, level: -1 }));
	else dispatch(openModal(props));
};
