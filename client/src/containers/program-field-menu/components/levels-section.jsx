import React from "react";
import shortid from "shortid";

import { Button, Input, Row, Stack, Table } from "components";

import {
	getSplicedArray,
	getUniqueLabel,
	getUpdatedArray,
	getValueFromInput,
	isInputValid,
} from "../program-field-menu.utils";

export const LevelsSection = ({ levels, setLevels }) => {
	// Template level
	const getNewDefaultLevel = () => ({
		label: getUniqueLabel(levels),
		intensity: 1,
		rest: 1,
		id: shortid.generate(),
	});

	// Push new template level to levels
	const addLevel = (e) => {
		e.preventDefault();
		setLevels([...levels, getNewDefaultLevel()]);
	};

	// Remove levels item with corresponding index
	const removeLevel = (e) => {
		e.preventDefault();
		const index = e.target.dataset.index;
		setLevels(getSplicedArray(levels, index));
	};

	// Modify level prop value if valid
	const updateLevel = (value, { name, type, checked, dataset }) => {
		const { index } = dataset;
		const newValue = getValueFromInput(type, checked, value);
		if (isInputValid(name, newValue, levels))
			setLevels(getUpdatedArray(levels, index, name, newValue));
	};

	// ---------------------- Render -----------------------

	const LevelInput = (name, type, value, i) => (
		<Input
			type={type}
			name={name}
			value={value}
			min={0}
			data={["index", i]}
			handler={updateLevel}
		/>
	);

	const getTableRow = (level, i) => {
		const { label, intensity, rest } = level;
		return [
			<Button text="-" handler={removeLevel} data={["index", i]} />,
			LevelInput("label", "text", label, i),
			LevelInput("intensity", "number", intensity, i),
			LevelInput("rest", "number", rest, i),
		];
	};

	return (
		<Stack compact>
			<Row center>
				{!!levels.length && (
					<Table
						emptyCornerCell
						headCells={["Label", "Intensity", "Recovery"]}
						bodyRows={levels.map((level, i) => getTableRow(level, i))}
					/>
				)}
			</Row>
			<Row>
				<Button text="New level" handler={addLevel} />
			</Row>
		</Stack>
	);
};

export default LevelsSection;
