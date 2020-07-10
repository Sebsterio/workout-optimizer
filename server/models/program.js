const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	dateUpdated: Date,
	description: String,
	fields: String,
});

const Program = mongoose.model("program", ProgramSchema);

module.exports = Program;
