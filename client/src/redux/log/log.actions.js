import axios from "axios";

import logActionTypes from "./log.types";
import { openModal } from "../modal/modal.actions";
import { getTokenConfig } from "../utils";

const { ADD_ENTRY, REMOVE_ENTRY } = logActionTypes;

// ----------------- Basic -----------------

export const addEntry = (data) => ({
	type: ADD_ENTRY,
	payload: data,
});

export const removeEntry = (data) => ({
	type: REMOVE_ENTRY,
	payload: data,
});

// ----------------- Thunk ------------------

// INITIAL_STATE = {
// 		Mon_Jun_15_2020: {
//  		dateStr: "Mon Jun 15 2020",
// 			quads: 1,
// 			upperBack: 2,
// 			chest: 3,
// 		},
// 	},

const convertLog = (log) => {
	const entriesArr = Object.entries(log);
	return entriesArr.map((entry) => ({
		dateStr: entry[0].split("_").join(" "),
		content: JSON.stringify(entry[1]),
	}));
};

export const createLog = (newUserData) => (dispatch, getState) => {
	const localLog = {
		userId: newUserData.id,
		PTs: [],
		date_updated: new Date(),
		entries: convertLog(getState().log),
	};
	axios.post("/api/log", JSON.stringify(localLog), getTokenConfig(getState));
};

export const updateEntry = () => {};
