const express = require("express");

const auth = require("../../middleware/auth");
const Program = require("../../models/program");

const router = express.Router();

// ------------------ Create program -------------------

// @access: program owner only

router.post("/create", auth, async (req, res) => {
	const { userId, body } = req;
	const { name, description, dateUpdated, fields } = body;

	const newProgram = new Program({
		userId,
		name,
		description,
		dateUpdated,
		fields,
	});
	const program = await newProgram.save();
	if (!program)
		return res.status(500).json({ msg: "Something went wrong saving program" });
	res.status(201).send({ _id: program._id });
});

// ---------------- Update own program -----------------

// @access: program owner and PT

router.post("/update", auth, async (req, res) => {
	try {
		const { userId } = req;
		const { _id, name, description, fields, dateUpdated } = req.body;

		const program = await Program.findById(_id);
		if (!program) {
			return res.status(404).send();
		}
		if (program.userId !== userId) {
			return res.status(401).json({ msg: "Unauthorized" });
		}

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

// ------------------- Get own program -------------------

// @access: program owner and  PT

router.post("/sync", auth, async (req, res) => {
	const { userId } = req;
	const { _id } = req.body;

	const program = await Program.findById(_id);
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

// -------------------- Delete own program -------------------

// @access: program owner only

router.delete("/:id", auth, async (req, res) => {
	try {
		const { userId, params } = req;
		const { id } = params;

		const program = await Program.findById(id);
		if (!program) throw Error("Program does not exist");
		if (program.userId !== userId) throw Error("Unauthorized");

		await Program.findByIdAndRemove(id);
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ------------------ Publish program -------------------

router.post("/publish", auth, async (req, res) => {
	try {
		const { userId } = req;
		const { author, _id } = req.body;

		const privateProgram = await Program.findById(_id);
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
		await publicProgram.save();
		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

module.exports = router;
