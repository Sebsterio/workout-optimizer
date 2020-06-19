const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	PTs: [String], // PT userIDs
	dateUpdated: Date,
	entries: [
		{
			dateStr: String,
			content: String,
		},
	],
});

const Log = mongoose.model("log", LogSchema);

module.exports = Log;
