import { Schema, model } from "mongoose";

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
	date_registered: {
		type: Date,
		default: Date.now,
	},
	logs: [String], // log IDs
});

const User = model("user", UserSchema);

export default User;
