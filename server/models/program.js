const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
	name: String,
	id: String,
	userId: String,
	dateUpdated: Date,
	description: String,
	fields: String,
	isPublic: Boolean,
	author: String,
});

const Program = mongoose.model("program", ProgramSchema);

module.exports = Program;
