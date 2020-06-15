import { Schema, model } from "mongoose";

export const EntrySchema = new Schema({
	dateStr: String,
	content: String,
});

export const LogSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	PTs: [String], // authorized PT userIDs
	date_updated: {
		type: Date,
		default: Date.now,
	},
	entries: {
		type: Array,
		value: EntrySchema,
	},
});

const Log = model("log", LogSchema);

export default Log;

// const newLog1 = {
// 	entries: [
// 		{ exercises: [{ area: "legs" }, { area: "chest" }] },
// 		{ exercises: [{ area: "upperBody" }, { area: "arms" }] },
// 	],
// 	PTs: ["pt1", "pt2"],
// };
