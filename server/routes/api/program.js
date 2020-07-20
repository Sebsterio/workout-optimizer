const express = require("express");

const auth = require("../../middleware/auth");
const Program = require("../../models/program");

const router = express.Router();

// ------------------ Create program -------------------

// @access: program owner only

router.post("/create", auth, async (req, res) => {
	const { userId, body } = req;
	const { id, name, description, dateModified, fields } = body;

	const newProgram = new Program({
		id,
		userId,
		name,
		description,
		dateModified,
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
		const { id, name, description, fields, dateModified } = req.body;

		const program = await Program.findOne({ id });

		if (!program) return res.status(404).send();
		if (program.userId !== userId)
			return res.status(401).json({ msg: "Unauthorized" });

		await Program.findOneAndUpdate(
			{ id },
			{ name, description, fields, dateModified }
		);

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
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

		const { name, description, dateModified, fields } = privateProgram;
		const publicProgram = new Program({
			author,
			isPublic: true,
			name,
			description,
			dateModified,
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
