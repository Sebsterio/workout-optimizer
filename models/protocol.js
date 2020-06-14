import { Schema, model } from "mongoose";

// Create Schema
const ProtocolSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
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

const Protocol = model("protocol", ProtocolSchema);

export default Protocol;

// 	name: "name",
// 	areas: [
// 		{
// 			name: "arms",
// 			levels: [
// 				{ label: "None" },
// 				{ label: "Small", rest: 0 },
// 				{ label: "Medium", rest: 1 },
// 				{ label: " Big", rest: 2 },
// 			],
// 		},
// 	]
