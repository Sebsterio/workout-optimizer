import { Schema, model } from "mongoose";

import { LogSchema } from "./log";

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	register_date: {
		type: Date,
		default: Date.now,
	},
	log: {
		type: Array,
		value: LogSchema,
	},
});

const User = model("user", UserSchema);

export default User;

// user = {
// 	username: "",
// 	email: "",
// 	logs: [
// 		{ protocol: "id", log: [], planned: [] },
// 		{
// 			protocol: "id",
// 			log: [
// 				{
// 					date: "Date",
// 					quads: 1,
// 					upperBack: 2,
// 					chest: 3,
// 				},
// 			],
// 			planned: [],
// 		},
// 	],
// };
