// GET all on login (not app init) or sync; sorted chronologically
// POST day on input (replace)
export const INITIAL_STATE = {
	FriJun122020: {
		quads: 1,
		upperBack: 2,
		chest: 3,
	},
};

// planned: [
// 	// old days cleared on session start
// 	// calculate for cells in view
// 	{
// 		date: ("n" * ("startDate" + 1)) % 4, // something like that
// 		start: "date", // set on adding reminder on a future date
// 		end: "date", // set on removing reminder on a future date
// 		upperBody: 2,
// 	},
// ],

// DB
// const user = {
// 	username: "",
// 	logs: [
// 		{ protocol: "id", log: [], planned: [] },
// 		{ protocol: "id", log: [], planned: [] },
// 	],
// };
