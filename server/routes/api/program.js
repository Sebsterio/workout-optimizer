const express = require("express");

const auth = require("../../middleware/auth");
const Program = require("../../models/program");

const router = express.Router();

// ------------------ Create program -------------------

// @access: program owner only

router.post("/create", auth, async (req, res) => {
	const { userId } = req;
	const newProgram = new Program({ userId, ...req.body });
	const program = await newProgram.save();
	if (!program)
		return res.status(500).json({ msg: "Something went wrong saving program" });
	res.status(201).send();
});

// ---------------- Update own program -----------------

// @access: program owner and PT

router.post("/update", auth, async (req, res) => {
	try {
		const { userId } = req;
		const { name, description, fields, dateUpdated } = req.body;

		const program = await Program.findOne({ userId });
		if (!program) throw Error("Program not found");

		program.userId = userId;
		program.name = name;
		program.description = description;
		program.fields = fields;
		program.dateUpdated = dateUpdated;
		await program.save();

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

module.exports = router;

// ------------------- Get own program -------------------

// @access: program owner and  PT

router.post("/sync", auth, async (req, res) => {
	const { userId } = req;
	const localDate = req.body.dateUpdatedLocal;
	const dateUpdatedLocal = localDate ? new Date(localDate).getTime() : 0;

	const program = await Program.findOne({ userId });
	if (!program) return res.status(404).json({ msg: "Program not found" });
	const dateUpdatedRemote = program.dateUpdated
		? program.dateUpdated.getTime()
		: 0;

	if (dateUpdatedRemote === dateUpdatedLocal) return res.status(204).send();
	else res.status(200).json(program);
});

// -------------------- Delete own program -------------------

// @access: program owner only

router.delete("/", auth, async (req, res) => {
	try {
		const { userId } = req;
		const program = await Program.findOne({ userId });
		if (!program) throw Error("Program does not exist");

		await Program.findOneAndRemove({ userId });
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ------------------ Publish program -------------------

router.post("/publish", auth, async (req, res) => {
	const { userId } = req;
	const { author } = req.body;

	const privateProgram = await Program.findOne({ userId });
	if (!privateProgram)
		return res.status(404).json({ msg: "Remote program not found" });

	try {
		const publicProgram = new Program({
			userId: "public",
			name: privateProgram.name,
			description: privateProgram.description,
			dateUpdated: privateProgram.dateUpdated,
			fields: privateProgram.fields,
			author,
		});
		await publicProgram.save();
		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ---------------- Get public programs -----------------

// @access: all

router.get("/public", async (req, res) => {
	try {
		// const { query } = req;
		const programs = await Program.find({ userId: "public" }).limit(10);
		if (!programs.length)
			return res.status(404).json({ msg: "Programs not found" });
		else res.status(200).json(programs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});
