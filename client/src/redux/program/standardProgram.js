import shortid from "shortid";

export const standardProgram = {
	isSyncing: false,
	isSynced: false,
	isPublishing: false,
	isPublished: true,
	isPublic: true,
	id: "standard",
	dateModified: null,
	name: "Standard program",
	description: "Some description bla bla bla...",
	fields: [
		{
			name: "arms",
			icon: {
				id: "arms",
				url: "https://image.flaticon.com/icons/svg/30/30237.svg",
				size: "66%",
			},
			description: "Exercise description here...",
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			// max 4 fields
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			// !levels && !details -> binary field
		},
		{
			name: "chest",
			description: "Exercise description here...",
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			name: "upper back",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			name: "core",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			name: "lower back",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			name: "quads",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			name: "glutes",
		},
		{
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 1, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 2, id: shortid.generate() },
			],
			details: [
				{
					label: "sets",
					type: "number",
					defaultVal: 1,
					id: shortid.generate(),
				},
				{
					label: "reps",
					type: "number",
					defaultVal: 10,
					id: shortid.generate(),
				},
				{ label: "kg", type: "number", defaultVal: 20, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
			name: "cardio",
		},
	],
};
