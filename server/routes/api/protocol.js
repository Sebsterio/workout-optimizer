const express = require("express");

const auth = require("../../middleware/auth");
const Protocol = require("../../models/protocol");

const router = express.Router();

// ------------------ Create protocol -------------------

// @access: protocol owner only

router.post("/create", auth, async (req, res) => {
	const { userId } = req;
	const newProtocol = new Protocol({ userId, ...req.body });
	const protocol = await newProtocol.save();
	if (!protocol)
		return res
			.status(500)
			.json({ msg: "Something went wrong saving protocol" });
	res.status(201).send();
});

// ------------------ Publish protocol -------------------

router.post("/publish", auth, async (req, res) => {
	const { userId } = req;
	const { author } = req.body;

	const privateProtocol = await Protocol.findOne({ userId });
	if (!privateProtocol)
		return res.status(404).json({ msg: "Remote protocol not found" });

	try {
		const publicProtocol = new Protocol({
			name: privateProtocol.name,
			description: privateProtocol.description,
			dateUpdated: privateProtocol.dateUpdated,
			userId: "public",
			author,
		});
		console.log(">>>>>>>>>>>>>>>>>>>>>> ", publicProtocol);
		await publicProtocol.save();
		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

// ---------------- Update protocol -----------------

// @access: protocol owner and PT

router.post("/update", auth, async (req, res) => {
	try {
		const { userId } = req;
		const { name, description, fields, dateUpdated } = req.body;

		const protocol = await Protocol.findOne({ userId });
		if (!protocol) throw Error("Protocol not found");

		protocol.userId = userId;
		protocol.name = name;
		protocol.description = description;
		protocol.fields = fields;
		protocol.dateUpdated = dateUpdated;
		await protocol.save();

		res.status(200).send();
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

module.exports = router;

// ------------------- Get protocol -------------------

// @access: protocol owner and  PT

router.post("/sync", auth, async (req, res) => {
	const { userId } = req;
	const localDate = req.body.dateUpdatedLocal;
	const dateUpdatedLocal = localDate ? new Date(localDate).getTime() : 0;

	const protocol = await Protocol.findOne({ userId });
	if (!protocol) return res.status(404).json({ msg: "Protocol not found" });
	const dateUpdatedRemote = protocol.dateUpdated
		? protocol.dateUpdated.getTime()
		: 0;

	if (dateUpdatedRemote === dateUpdatedLocal) return res.status(204).send();
	else res.status(200).json(protocol);
});

// ------------------ Delete protocol -------------------

// @access: protocol owner only

router.delete("/", auth, async (req, res) => {
	try {
		const { userId } = req;
		const protocol = await Protocol.findOne({ userId });
		if (!protocol) throw Error("Protocol does not exist");

		await Protocol.findOneAndRemove({ userId });
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});
