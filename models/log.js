import { Schema, model } from "mongoose";

export const LogSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	PTs: [String], // PT userIDs
	dateUpdated: {
		type: Date,
		default: Date.now,
	},
	entries: [
		{
			dateStr: String,
			content: String,
		},
	],
});

const Log = model("log", LogSchema);

export default Log;
