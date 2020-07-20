const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	dateUpdated: {
		type: Date,
		required: true,
	},
	entries: [
		{
			dateStr: String,
			content: String,
		},
	],
});

const Log = mongoose.model("log", LogSchema);

module.exports = Log;
