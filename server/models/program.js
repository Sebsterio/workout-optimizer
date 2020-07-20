const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	id: String,
	userId: String,
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
