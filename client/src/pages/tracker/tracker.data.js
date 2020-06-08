// recovery calculated dynamically

const trackerData = {
	protocol: {
		id: "id",
		name: "name",
		bodyParts: [
			{
				name: "arms",
				iconUrl: "url",
				smallWorkoutRest: 0,
				mediumWorkoutRest: 1,
				bigWorkoutRest: 2,
			},
			{ name: "chest" },
			{ name: "upperBack" },
			{ name: "core" },
			{ name: "lowerBack" },
			{ name: "quads" },
			{ name: "glutes" },
			{ name: "cardio" },
		],
	},
	// GET all on login (not app init); sorted chronologically
	// negative intensity = recovery
	log: [
		// POST day on input (replace)
		// what if added entry in a past day? nothing. Sort on download
		{
			date: "Mon Jun 08 2020",
			chest: -2,
			core: 2,
		},
		{
			date: "Sun Jun 07 2020",
			quads: -2,
			lowerBack: 2,
		},
		{
			date: "Sat Jun 06 2020",
			upperBack: 3,
			core: 1,
		},
		{
			date: "Fri Jun 05 2020",
			chest: 1,
			quads: 3,
		},
	],
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
const user = {
	username: "",
	logs: [
		{ protocol: "id", log: [], planned: [] },
		{ protocol: "id", log: [], planned: [] },
	],
};

export default trackerData;
