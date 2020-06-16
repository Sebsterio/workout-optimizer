import { Router } from "express";

import auth from "../../middleware/auth";
import Log from "../../models/log";

const router = Router();

// ------------------ Create log -------------------

// @access: log owner only

router.post("/create", auth, async (req, res) => {
	const { userId } = req;
	const { dateUpdated, PTs, entries } = req.body;
	const newLog = new Log({ userId, dateUpdated, PTs, entries });
	const log = await newLog.save();
	if (!log)
		return res.status(500).json({ msg: "Something went wrong saving the log" });
	res.status(201).send();
});

// ------------------- Get log -------------------

// @access: log owner and  PT

router.post("/sync", auth, async (req, res) => {
	// TODO: verfiy userId against lowOnwer's id and PTs array
	// const inquiringUserId = req.userId;
	// const logOwnerUserId = null;
	const { userId } = req;
	const { dateUpdatedLocal } = req.body;

	const log = await Log.findOne({ userId });
	if (!log) return res.status(404).json({ msg: "Log not found" });

	const dateUpdatedRemote = log.dateUpdated;
	if (dateUpdatedRemote === dateUpdatedLocal) return res.status(204).send();
	else res.status(200).json(log);
});

// ------------------ Delete log -------------------

// @access: log owner only

// router.delete('/', auth, async (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   try {
//     const item = await newItem.save();
//     if (!item) throw Error('Something went wrong saving the item');

//     res.status(200).json(item);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

// ---------------- Add / update / remove entry -----------------

// @access: log owner and  PT

router.post("/entry", auth, async (req, res) => {
	const { userId } = req;
	const { dateStr, content, dateUpdated } = req.body;

	try {
		const log = await Log.findOne({ userId });
		if (!log) throw Error("Log not found");

		const entry = log.entries.find((entry) => entry.dateStr === dateStr);

		// add new entry
		if (!entry && content) {
			log.entries.push({ dateStr, content: content });
		}
		// update entry
		else if (entry && content) {
			entry.content = content;
		}
		// delete entry
		else if (entry && !content) {
			log.entries = log.entries.filter((entry) => entry.dateStr !== dateStr);
		}
		// attempt to remove non-existing entry
		else {
			throw Error("Error updating database");
		}
		log.dateUpdated = dateUpdated;
		await log.save();

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

export default router;
