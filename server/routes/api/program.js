const express = require("express");
// import { v4 as uuid } from "uuid";

const auth = require("../../middleware/auth");
const Program = require("../../models/program");

const router = express.Router();

// ------------------ Create program -------------------

// @access: program owner only

router.post("/create", auth, async (req, res) => {
	const { userId, body } = req;
	const { id, name, description, dateUpdated, fields } = body;

	const newProgram = new Program({
		id,
		userId,
		name,
		description,
		dateUpdated,
		fields,
	});
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
		const { id, name, description, fields, dateUpdated } = req.body;

		const program = await Program.findOne({ id });
		if (!program) {
			return res.status(404).send();
		}
		if (program.userId !== userId) {
			return res.status(401).json({ msg: "Unauthorized" });
		}

		await Program.findOneAndUpdate(
			{ id },
			{
				name,
				description,
				fields,
				dateUpdated,
			}
		);

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ------------------- Get own program -------------------

// @access: program owner and  PT

router.post("/sync", auth, async (req, res) => {
	const { userId } = req;
	const { id } = req.body;

	const program = await Program.findById(id);
	if (!program) {
		return res.status(404).json({ msg: "Remote program not found" });
	}
	if (program.userId !== userId && !program.isPublic) {
		return res.status(401).json({ msg: "Unauthorized" });
	}

	const localDate = req.body.dateUpdatedLocal;
	const dateUpdatedLocal = localDate ? new Date(localDate).getTime() : 0;
	const dateUpdatedRemote = program.dateUpdated
		? program.dateUpdated.getTime()
		: 0;

	if (dateUpdatedRemote === dateUpdatedLocal) return res.status(204).send();
	else res.status(200).json(program);
});

// ------------------ Publish program -------------------

router.post("/publish", auth, async (req, res) => {
	try {
		const { userId } = req;
		const { author, id } = req.body;

		const privateProgram = await Program.findOne({ id });
		if (!privateProgram) {
			return res.status(404).json({ msg: "Remote program not found" });
		}
		if (privateProgram.userId !== userId) {
			return res.status(401).json({ msg: "Unauthorized" });
		}

		const { name, description, dateUpdated, fields } = privateProgram;
		const publicProgram = new Program({
			author,
			isPublic: true,
			name,
			description,
			dateUpdated,
			fields,
		});
		const savedProgram = await publicProgram.save();
		savedProgram.id = savedProgram._id;
		await savedProgram.save();

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
