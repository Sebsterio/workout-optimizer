const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProgramsListSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	saved: [String],
	dateModified: Date,
});

const ProgramsList = mongoose.model("programs-list", ProgramsListSchema);

module.exports = ProgramsList;
