export const INITIAL_STATE = {
	id: "id",
	name: "name",
	fields: [
		{
			name: "arms",
			iconUrl: "url|svgCode",
			notes: "", // for protocol, not exercise (show on field field click)
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			// max 4 fields
			details: [
				{ label: "sets", default: 1 },
				{ label: "reps", default: 10 },
				{ label: "kg", default: 20 },
				{ label: "mins", default: 20 },
			],
			// !levels && !details -> binary field
		},
		{
			name: "chest",
			iconUrl: "url|svgCode",
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
		},
		{
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			name: "upperBack",
		},
		{
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			name: "core",
		},
		{
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			name: "lowerBack",
		},
		{
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			name: "quads",
		},
		{
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			name: "glutes",
		},
		{
			levels: [
				{ label: "Small", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: " Big", intensity: 3, rest: 2 },
			],
			name: "cardio",
		},
	],
};
