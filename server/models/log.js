const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	// ObjectId of corresponding program
	// stored in log for now as log syncs according to dateUpdated prop
	programId: String,
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
