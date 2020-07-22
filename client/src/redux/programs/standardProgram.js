import shortid from "shortid";

export const standardProgramTemplate = {
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
			name: "cardio",
			icon: {
				url: "https://image.flaticon.com/icons/svg/30/30391.svg",
				size: "60%",
			},
			levels: [
				{ label: "Light", intensity: 1, rest: 0, id: shortid.generate() },
				{ label: "Medium", intensity: 2, rest: 0, id: shortid.generate() },
				{ label: "Hard", intensity: 3, rest: 1, id: shortid.generate() },
			],
			details: [
				{
					label: "mins",
					type: "number",
					defaultVal: 20,
					id: shortid.generate(),
				},
				{ label: "km", type: "number", defaultVal: 2, id: shortid.generate() },
				{ label: "done", type: "checkbox" },
			],
		},
		{
			name: "arms",
			icon: {
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
			icon: {
				url: "https://image.flaticon.com/icons/svg/31/31432.svg",
				size: "84%",
			},
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
			name: "core",
			icon: {
				url: "https://image.flaticon.com/icons/svg/30/30728.svg",
				size: "55%",
			},
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
			name: "upper back",
			icon: {
				url: "https://image.flaticon.com/icons/svg/30/30672.svg",
				size: "84%",
			},
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
			name: "lower back",
			icon: {
				url: "https://image.flaticon.com/icons/svg/30/30672.svg",
				size: "84%",
			},
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
			name: "quads",
			icon: {
				url: "https://image.flaticon.com/icons/svg/30/30627.svg",
				size: "60%",
			},
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
			name: "glutes",
			icon: {
				url: "https://image.flaticon.com/icons/svg/30/30627.svg",
				size: "60%",
			},
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
	],
};
