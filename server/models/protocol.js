const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProtocolSchema = new Schema({
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

const Protocol = mongoose.model("protocol", ProtocolSchema);

module.exports = Protocol;
