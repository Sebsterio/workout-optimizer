const express = require("express");

const auth = require("../../middleware/auth");
const Program = require("../../models/program");
const ProgramsList = require("../../models/programs-list");

const router = express.Router();

// ---------------------- Get public programs -----------------------

// @access: all

router.get("/public", async (req, res) => {
	try {
		const programs = await Program.find({ isPublic: true }).limit(10);
		if (!programs.length)
			return res.status(404).json({ msg: "No programs found" });
		else res.status(200).json(programs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ------------------------ Get own programs -------------------------

// @access: user

// Get all programs from user's programs list except current program
router.get("/saved", auth, async (req, res) => {
	try {
		const { userId } = req;

		// Get list of user's programs IDs
		const programsList = await ProgramsList.findOne({ userId });
		if (!programsList)
			return res.status(404).json({ msg: "Programs list not found" });

		// Exclude current program & standard program
		let { current, all } = programsList;
		all = all.filter(
			(programId) => programId !== current && programId !== "standard"
		);

		if (!all.length)
			return res.status(404).json({ msg: "Programs list empty" });

		// Get array of programs data
		const programIdsRegex = all.map((programId) => `(${programId})`).join("|");
		const programs = await Program.find({ id: { $regex: programIdsRegex } });

		res.status(200).json(programs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// -------------------- Delete own program -------------------

// @access: program owner only

router.delete("/:id", auth, async (req, res) => {
	try {
		const { userId, params } = req;
		const { id } = params;

		const program = await Program.findOne({ id });
		if (!program) throw Error("Program does not exist");
		if (program.userId !== userId) throw Error("Unauthorized");

		await Program.findOneAndRemove({ id });
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ---------------- Delete all own private programs ----------------

// @access: program owner only

router.delete("/", auth, async (req, res) => {
	try {
		const { userId } = req;
		await Program.remove({ userId });
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
