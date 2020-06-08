// recovery calculated dynamically

trackerData = {
	protocol: {
		id: "id",
		name: "name",
		bodyParts: [
			{
				name: "upperBody",
				iconUrl: "url",
				smallWorkoutRest: 0,
				mediumWorkoutRest: 1,
				bigWorkoutRest: 2,
			},
			{
				name: "lowerBody",
				iconUrl: "url",
				smallWorkoutRest: 0,
				mediumWorkoutRest: 1,
				bigWorkoutRest: 2,
			},
		],
	},
	// GET all on login (not app init); sorted chronologically
	log: [
		// POST day on input (replace)
		// what if added entry in a past day? nothing. Sort on download
		{
			date: "date",
			upperBody: 2,
			lowerBody: 2,
		},
	],
	planned: [
		// old days cleared on session start
		// calculate for cells in view
		{
			date: (n * (startDate + 1)) % 4, // something like that
			start: "date", // set on adding reminder on a future date
			end: "date", // set on removing reminder on a future date
			upperBody: 2,
		},
	],
};

// DB
user = {
	username: "",
	logs: [
		{ protocol: "id", log: [], planned: [] },
		{ protocol: "id", log: [], planned: [] },
	],
};
