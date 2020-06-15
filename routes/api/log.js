import { Router } from "express";

import auth from "../../middleware/auth";
import Log from "../../models/log";

const router = Router();

// ------------------ Create log -------------------

// @access: log owner only
// post local entries

router.post("/", auth, async (req, res) => {
	const { userId } = req;
	const { entries, PTs } = req.body;
	try {
		const newLog = new Log({ userId, entries, PTs, date_updated: new Date() });
		const log = await newLog.save();
		if (!log) throw Error("Something went wrong saving the log");
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ------------------- Get log -------------------

// @access: log owner and  PT

// TODO: chose whether should merge or replace local

router.get("/", auth, async (req, res) => {
	// TODO: verfiy userId against lowOnwer's id and PTs array
	// const inquiringUserId = req.userId;
	// const logOwnerUserId = null;
	const { userId } = req;
	try {
		const log = await Log.findOne({ userId });
		if (!log) throw Error("Log not found");
		res.status(200).json(log);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
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

// ---------------- Add / update entry -----------------

// @access: log owner and  PT

router.post("/entry", auth, async (req, res) => {
	const { userId } = req;
	const { dateStr, content } = req.body;

	try {
		const log = await Log.findOne({ userId });
		if (!log) throw Error("Log not found");
		const entry = log.entries.find((entry) => entry.dateStr === dateStr);

		if (entry) {
			entry.content = content;
		} else {
			log.entries.push({ dateStr, content: content });
		}
		await log.save();
		res.status(200).json(entry);
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ------------------- Remove entry -------------------

// @access: log owner and  PT

// router.delete("/entry", auth, async (req, res) => {
// 	const { userId } = req;
// 	const { dateStr, content } = req.body;

// 	try {
// 		const log = await Log.findOne({ userId });
// 		if (!log) throw Error("Log not found");
// 		const entry = log.entries.find((entry) => entry.dateStr === dateStr);

// 		if (entry) {
// 			entry.content = content;
// 		} else {
// 			log.entries.push({ dateStr, content: content });
// 		}
// 		await log.save();
// 		res.status(200).json(entry);
// 	} catch (err) {
// 		res.status(400).json({ msg: err.message });
// 	}
// });

export default router;
