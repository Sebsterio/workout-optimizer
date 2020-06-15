import { Schema, model } from "mongoose";

// Create Schema
export const LogSchema = new Schema({
	date_created: {
		type: Date,
		default: Date.now,
	},
	date_updated: {
		type: Date,
		default: Date.now,
	},
	exercises: [
		{
			area: {
				type: String,
				required: true,
			},
			level: Number,
			sets: Number,
			reps: Number,
			resistance: Number,
			notes: String,
		},
	],
});

const Log = model("log", LogSchema);

export default Log;
