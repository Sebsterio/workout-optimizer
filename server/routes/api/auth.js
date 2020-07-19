const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const User = require("../../models/user");

const router = express.Router();

// ---------------- Get user data ----------------

// @access: private (token)

router.get("/", auth, async (req, res) => {
	try {
		const { userId } = req;
		const user = await User.findById(userId).select("-password");
		if (!user) throw Error("User Does not exist");

		res.status(200).json({
			id: user.id,
			name: user.name,
		});
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ------------------- Register -------------------

// @access: public

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password)
		return res.status(400).json({ msg: "Missing fields" });

	const user = await User.findOne({ email });
	if (user) return res.status(403).json({ msg: "User already exists" });

	// Create user and add to DB
	try {
		const salt = await bcrypt.genSalt(10);
		if (!salt) throw Error("Error with bcrypt");

		const hash = await bcrypt.hash(password, salt);
		if (!hash) throw Error("Error hashing the password");

		const newUser = new User({
			name,
			email,
			password: hash,
		});

		const savedUser = await newUser.save();
		if (!savedUser) throw Error("Error saving the user");

		const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET);

		res.status(200).json({
			token,
			id: savedUser.id,
			name: savedUser.name,
		});
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

// ------------------- Login -------------------

// @access: public

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) throw Error("Missing credentials");

		const user = await User.findOne({ email });
		if (!user) throw Error("User does not exist");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw Error("Invalid credentials");

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		res.status(200).json({
			token,
			id: user.id,
			name: user.name,
		});
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ---------------- Remove user ----------------

router.post("/delete", auth, async (req, res) => {
	try {
		const { password } = req.body;
		if (!password) throw Error("Missing credentials");

		const { userId } = req;
		const user = await User.findById(userId);
		if (!user) throw Error("User does not exist");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw Error("Invalid credentials");

		await User.findByIdAndRemove(userId);
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
