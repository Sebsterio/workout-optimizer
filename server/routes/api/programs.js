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

// Get all except current program (:id)
router.get("/private/:id", auth, async (req, res) => {
	try {
		const { userId, params } = req;
		const { id } = params;

		const programs = await (await Program.find({ userId })).filter(
			(program) => program._id !== id
		);
		if (!programs.length)
			return res.status(404).json({ msg: "No programs found" });
		else res.status(200).json(programs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

module.exports = router;

// -------------------- Delete all own programs -------------------

// @access: program owner only

router.delete("/private", auth, async (req, res) => {
	try {
		const { userId } = req;
		await Program.remove({ userId });
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});
