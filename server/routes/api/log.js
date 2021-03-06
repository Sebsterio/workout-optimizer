const express = require("express");

const auth = require("../../middleware/auth");
const Log = require("../../models/log");

const router = express.Router();

// ------------------ Create log -------------------

// @access: log owner only

router.post("/create", auth, async (req, res) => {
	const { userId } = req;
	const { dateModified, PTs, entries } = req.body;
	const newLog = new Log({ userId, dateModified, PTs, entries });
	const log = await newLog.save();
	if (!log)
		return res.status(500).json({ msg: "Something went wrong saving the log" });
	res.status(201).send();
});

// ------------------- Get log -------------------

// @access: log owner and  PT

router.post("/sync", auth, async (req, res) => {
	const { userId } = req;
	const log = await Log.findOne({ userId });
	if (!log) return res.status(404).json({ msg: "Log not found" });

	const localDate = req.body.dateModifiedLocal;
	const dateModifiedLocal = localDate ? new Date().getTime(localDate) : 0;
	const dateModifiedRemote = log.dateModified ? log.dateModified.getTime() : 0;

	if (dateModifiedRemote === dateModifiedLocal) return res.status(204).send();
	else res.status(200).json(log);
});

// ------------------ Delete log -------------------

// @access: log owner only

router.delete("/", auth, async (req, res) => {
	try {
		const { userId } = req;
		const log = await Log.findOne({ userId });
		if (!log) throw Error("Log does not exist");

		await Log.findOneAndRemove({ userId });
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ---------------- Add / update / remove entry -----------------

// @access: log owner and  PT

router.post("/entry", auth, async (req, res) => {
	const { userId } = req;
	const { dateStr, content, dateModified } = req.body;

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
		} else {
			throw Error("Unable to remove a non-existing entry");
		}
		log.dateModified = dateModified;
		await log.save();

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
