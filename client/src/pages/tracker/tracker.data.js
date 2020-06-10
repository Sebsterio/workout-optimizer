// recovery calculated dynamically

const trackerData = {
	protocol: {
		id: "id",
		name: "name",
		bodyParts: [
			{
				name: "arms",
				iconUrl: "url|svgCode",
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "chest",
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "upperBack",
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "core",
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "lowerBack",
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "quads",
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "glutes",
			},
			{
				levels: [
					{ label: "None" },
					{ label: "Small", rest: 0 },
					{ label: "Medium", rest: 1 },
					{ label: " Big", rest: 2 },
				],
				name: "cardio",
			},
		],
	},
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
