const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProgramsListSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	current: {
		type: String,
		required: true,
	},
	saved: [
		{
			type: String,
			required: true,
		},
	],
	dateUpdated: {
		type: Date,
		required: true,
	},
});

const ProgramsList = mongoose.model("programs-list", ProgramsListSchema);

module.exports = ProgramsList;
