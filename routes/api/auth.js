import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import auth from "../../middleware/auth";
import User from "../../models/User";

const router = Router();

// "id": "5ee5fe0ee2fca83b70371e54",
// "name": "Dev",
// "email": "sebster.dev@gmail.com"

// ------------------- Register -------------------

// @access: public

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Missing fields" });
	}

	// Check for duplicates
	const user = await User.findOne({ email });
	if (user) {
		return res.status(403).json({ msg: "User already exists" });
	}

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

		const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

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
	const { email, password } = req.body;

	// Validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Missing credentials" });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) throw Error("User does not exist");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw Error("Invalid credentials");

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		res.status(200).json({
			token,
			id: user._id,
			name: user.name,
		});
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ---------------- Get user data ----------------

// @access: private (token)

router.get("/user", auth, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) throw Error("User Does not exist");
		res.status(200).json({
			id: user._id,
			name: user.name,
		});
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

export default router;
