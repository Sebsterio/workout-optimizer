// recovery calculated dynamically

const trackerData = {
	protocol: {
		id: "id",
		name: "name",
		bodyParts: [
			{
				name: "arms",
				iconUrl: "url|svgCode",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "chest",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "upperBack",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "core",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "lowerBack",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "quads",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "glutes",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
			{
				name: "cardio",
				rest1: 0,
				rest2: 1,
				rest3: 2,
			},
		],
	},
	// GET all on login (not app init); sorted chronologically
	// negative intensity = recovery
	log: [
		// POST day on input (replace)
		// what if added entry in a past day? nothing. Sort on download
		// {
		// 	date: "Tue Jun 09 2020",
		// 	quads: 1,
		// 	upperBack: 2,
		// },
		// {
		// 	date: "Mon Jun 08 2020",
		// 	chest: 3,
		// 	core: 2,
		// },
		// {
		// 	date: "Sun Jun 07 2020",
		// 	quads: 2,
		// 	lowerBack: 1,
		// },
		// {
		// 	date: "Sat Jun 06 2020",
		// 	upperBack: 3,
		// 	core: 1,
		// },
		// {
		// 	date: "Fri Jun 05 2020",
		// 	chest: 1,
		// 	quads: 2,
		// },
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
// const user = {
// 	username: "",
// 	logs: [
// 		{ protocol: "id", log: [], planned: [] },
// 		{ protocol: "id", log: [], planned: [] },
// 	],
// };

export default trackerData;
