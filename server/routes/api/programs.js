const express = require("express");

const auth = require("../../middleware/auth");
const Program = require("../../models/program");

const router = express.Router();

// ---------------- Get public programs -----------------

// @access: all

router.get("/public", async (req, res) => {
	try {
		// const { query } = req;
		const programs = await Program.find({ isPublic: true }).limit(10);
		if (!programs.length)
			return res.status(404).json({ msg: "No programs found" });
		else res.status(200).json(programs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ---------------- Get private programs -----------------

// @access: user

router.get("/private", auth, async (req, res) => {
	try {
		// const { query } = req;
		const { userId } = req;
		const programs = await Program.find({ userId });
		if (!programs.length)
			return res.status(404).json({ msg: "No programs found" });
		else res.status(200).json(programs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

module.exports = router;
