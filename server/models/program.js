const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	dateModified: Date,
	fields: {
		type: String,
		required: true,
	},
	description: String,
	isPublic: Boolean,
	author: String,
});

const Program = mongoose.model("program", ProgramSchema);

module.exports = Program;
