import shortid from "shortid";

import absIcon from "assets/icons/field/abs.png";
import armsIcon from "assets/icons/field/arms.png";
import backIcon from "assets/icons/field/back.png";
import calvesIcon from "assets/icons/field/calves.png";
import cardioIcon from "assets/icons/field/cardio.png";
import chestIcon from "assets/icons/field/chest.png";
import glutesIcon from "assets/icons/field/glutes.png";
import quadsIcon from "assets/icons/field/quads.png";

// NOTES:
// !levels && !details -> binary field
// details: max 4 items

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
				url: cardioIcon,
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
				url: armsIcon,
				size: "75%",
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
			name: "chest",
			icon: {
				url: chestIcon,
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
				url: absIcon,
				size: "80%",
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
			name: "back",
			icon: {
				url: backIcon,
				size: "85%",
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
				url: glutesIcon,
				size: "75%",
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
				url: quadsIcon,
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
			name: "calves",
			icon: {
				url: calvesIcon,
				size: "85%",
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
