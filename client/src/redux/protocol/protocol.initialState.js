export const INITIAL_STATE = {
	id: "id",
	name: "name",
	fields: [
		{
			name: "arms",
			iconUrl: "url|svgCode",
			notes: "", // for protocol, not exercise (show on field field click)
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
				{ label: "done", type: "checkbox", defaultVal: true },
			],
			// !levels && !details -> binary field
		},
		{
			name: "chest",
			iconUrl: "url|svgCode",
			levels: [
				{ label: "Light", intensity: 1, rest: 0 },
				{ label: "Medium", intensity: 2, rest: 1 },
				{ label: "Hard", intensity: 3, rest: 2 },
			],
			details: [
				{ label: "sets", type: "number", defaultVal: 1 },
				{ label: "reps", type: "number", defaultVal: 10 },
				{ label: "kg", type: "number", defaultVal: 20 },
				{ label: "done", type: "checkbox", defaultVal: true },
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
				{ label: "done", type: "checkbox", defaultVal: true },
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
				{ label: "done", type: "checkbox", defaultVal: true },
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
				{ label: "done", type: "checkbox", defaultVal: true },
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
				{ label: "done", type: "checkbox", defaultVal: true },
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
				{ label: "done", type: "checkbox", defaultVal: true },
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
				{ label: "done", type: "checkbox", defaultVal: true },
			],
			name: "cardio",
		},
	],
};
