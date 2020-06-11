// recovery calculated dynamically

const trackerData = {
	// GET all on login (not app init) or sync; sorted chronologically
	// negative intensity = recovery
	log: [
		// POST day on input (replace)
		// what if added entry in a past day? nothing. Sort on download
		{
			date: "Wed Jun 10 2020",
			quads: 1,
			upperBack: 2,
			chest: 3,
		},
	],
	log1: {
		Jun192020: {
			quads: 1,
			upperBack: 2,
		},
		d200619: {},
	},
	planned: [
		// old days cleared on session start
		// calculate for cells in view
		{
			date: ("n" * ("startDate" + 1)) % 4, // something like that
			start: "date", // set on adding reminder on a future date
			end: "date", // set on removing reminder on a future date
			upperBody: 2,
		},
	],
};

// DB
// const user = {
// 	username: "",
// 	logs: [
// 		{ protocol: "id", log: [], planned: [] },
// 		{ protocol: "id", log: [], planned: [] },
// 	],
// };

export default trackerData;
