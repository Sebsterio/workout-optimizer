const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProtocolSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	areas: [
		{
			name: {
				type: String,
				required: true,
			},
			levels: [
				{
					label: {
						type: String,
						required: true,
					},
					rest: {
						type: Number,
						required: true,
					},
				},
			],
		},
	],
});

const Protocol = mongoose.model("protocol", ProtocolSchema);

module.exports = Protocol;
