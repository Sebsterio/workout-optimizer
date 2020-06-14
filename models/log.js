import { Schema, model } from "mongoose";

// Create Schema
export const LogSchema = new Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	exercises: [
		{
			area: {
				type: String,
				required: true,
			},
			level: {
				type: Number,
				required: true,
			},
		},
	],
});

const Log = model("log", LogSchema);

export default Log;
