const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
	userId: String,
	name: {
		type: String,
		required: true,
	},
	isPublic: Boolean,
	dateUpdated: Date,
	description: String,
	fields: String,
});

const Program = mongoose.model("program", ProgramSchema);

module.exports = Program;
