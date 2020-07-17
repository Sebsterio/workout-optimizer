const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
	mentors: [String], // Mentors' userIDs
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
