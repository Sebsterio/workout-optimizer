import logActionTypes from "./log.types";
import { openModal } from "../modal/modal.actions";

const { ADD_LOG, REMOVE_LOG } = logActionTypes;

// ----------------- Basic -----------------

const addLog = (data) => ({
	type: ADD_LOG,
	payload: data,
});

const removeLog = (data) => ({
	type: REMOVE_LOG,
	payload: data,
});

// ----------------- Thunk ------------------

export const addEntry = (data) => (dispatch) => {
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
