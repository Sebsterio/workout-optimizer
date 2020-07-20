const express = require("express");

const auth = require("../../middleware/auth");
const ProgramsList = require("../../models/programs-list");

const router = express.Router();

// ------------------------- Create list --------------------------

// @access: owner only

router.post("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { current, saved, dateModified } = body;
		const newList = new ProgramsList({ userId, current, saved, dateModified });
		const list = await newList.save();
		if (!list) throw Error("Error saving programs list");
		res.status(201).send();
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
});

// ------------------------- Update list --------------------------

router.put("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { current, saved, dateModified } = body;

		const list = await ProgramsList.findOneAndUpdate(
			{ userId },
			{ $set: { current, saved, dateModified } }
		);
		if (!list) throw Error("List not found");
		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ------------------------- Sync list --------------------------
// GET if newer than local
// TODO: POST if newere than remote

router.post("/sync", auth, async (req, res) => {
	try {
		const { userId } = req;
		const list = await ProgramsList.findOne({ userId });
		if (!list) return res.status(404).json({ msg: "Programs list not found" });

		const localDate = req.body.dateModifiedLocal;
		const dateModifiedLocal = localDate ? new Date().getTime(localDate) : 0;
		const dateModifiedRemote = list.dateModified
			? list.dateModified.getTime()
			: 0;

		if (dateModifiedRemote === dateModifiedLocal) return res.status(204).send();
		res.status(200).json(list);
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ------------------------- Delete list --------------------------

router.delete("/", auth, async (req, res) => {
	try {
		const { userId } = req;
		await ProgramsList.remove({ userId });
		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
