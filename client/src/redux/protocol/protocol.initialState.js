export const INITIAL_STATE = {
	id: "id",
	name: "name",
	fields: [
		{
			name: "arms",
			iconUrl: "url|svgCode",
			description: "Exercise description here...",
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			// max 4 fields
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			// !levels && !details -> binary field
		},
		{
			name: "chest",
			iconUrl: "url|svgCode",
			description: "Exercise description here...",
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			name: "upperBack",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			name: "core",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			name: "lowerBack",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			name: "quads",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			name: "glutes",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox" },
			],
			name: "cardio",
		},
	],
};
