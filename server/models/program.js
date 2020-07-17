const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
	userId: String,
	name: {
		type: String,
		required: true,
	},
	dateUpdated: Date,
	description: String,
	fields: String,
	isPublic: Boolean,
	// users who have saved it (and still have it)
	users: [String],
});

const Program = mongoose.model("program", ProgramSchema);

module.exports = Program;
