import React from "react";
import shortid from "shortid";
import { Row, Table, Button, Input } from "../../_common";
import {
	getUniqueLabel,
	getValueFromInput,
	isInputValid,
	getUpdatedArray,
	getSplicedArray,
} from "../area-menu.utils";

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
	const updateLevel = (e) => {
		const { name, type, checked, value, dataset } = e.target;
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
			dataIndex={i}
			handler={updateLevel}
		/>
	);

	const getTableRow = (level, i) => {
		const { label, intensity, rest } = level;
		return [
			<Button text="-" handler={removeLevel} dataIndex={i} />,
			LevelInput("label", "text", label, i),
			LevelInput("intensity", "number", intensity, i),
			LevelInput("rest", "number", rest, i),
		];
	};

	return (
		<>
			<Row>
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
		</>
	);
};

export default LevelsSection;
