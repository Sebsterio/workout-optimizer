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
		const newLog = new Log({ userId, entries, PTs });
		const log = await newLog.save();
		if (!log) throw Error("Something went wrong saving the log");
		res.status(200).json(log);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// ------------------- Get log -------------------

// @access: log owner and  PT

// TODO: chose whether should merge or replace local

// router.get('/', async (req, res) => {
// 	const inquiringUserId = req.userId;
// 	const logOwnerUserId = null

// 	// TODO: verfiy userId against lowOnwer's id and PTs array

//   try {
//     const items = await Log.find();
//     if (!items) throw Error('No items');

//     res.status(200).json(items);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

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

// router.post('/:userId/:dateStr', auth, async (req, res) => {
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

// ------------------- Remove entry -------------------

// @access: log owner and  PT

// router.delete('/:userId/:dateStr', auth, async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) throw Error('No item found');

//     const removed = await item.remove();
//     if (!removed)
//       throw Error('Something went wrong while trying to delete the item');

//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(400).json({ msg: e.message, success: false });
//   }
// });

export default router;
