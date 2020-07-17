const express = require("express");

const auth = require("../../middleware/auth");
const ProgramsList = require("../../models/programs-list");

const router = express.Router();

// ------------------------- Create list --------------------------

// @access: owner only

router.post("/", auth, async (req, res) => {
	const { userId } = req;
	const newList = new ProgramsList({ userId, ...req.body });
	const list = await newList.save();
	if (!list)
		return res
			.status(500)
			.json({ msg: "Something went wrong saving the programs list" });
	res.status(201).send();
});

// ------------------------- Update list --------------------------

router.put("/", auth, async (req, res) => {
	const { userId, body } = req;
	const { current, add, remove, dateUpdated } = body;
	try {
		const list = await ProgramsList.findOne({ userId });
		if (!list) throw Error("List not found");

		if (current) list.current = current;
		if (add) list.all.push(add);
		if (remove) list.all = list.all.filter((id) => id !== remove);
		list.dateUpdated = dateUpdated;
		await list.save();

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ------------------------- Sync list --------------------------
// GET if newer than local

router.post("/sync", auth, async (req, res) => {
	const { userId } = req;
	const list = await ProgramsList.findOne({ userId });
	if (!list) return res.status(404).json({ msg: "Programs list not found" });

	const localDate = req.body.dateUpdatedLocal;
	const dateUpdatedLocal = localDate ? new Date().getTime(localDate) : 0;
	const dateUpdatedRemote = list.dateUpdated ? list.dateUpdated.getTime() : 0;

	if (dateUpdatedRemote === dateUpdatedLocal) return res.status(204).send();
	else res.status(200).json(list);
});

// ------------------------- Delete list --------------------------

router.delete("/", auth, async (req, res) => {
	const { userId } = req;
	try {
		await ProgramsList.remove({ userId });
		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
