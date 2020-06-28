import React from "react";
import shortid from "shortid";
import {
	getUniqueLabel,
	getValueFromInput,
	isInputValid,
	getUpdateArray,
	getSplicedArray,
} from "../row-form.utils";

const LevelsSection = ({ levels, setLevels }) => {
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
			setLevels(getUpdateArray(levels, index, name, newValue));
	};

	// ---------------------- Render -----------------------

	const LevelInput = (name, type, value, i) => (
		<td>
			<input
				className="levels-section__input"
				type={type}
				name={name}
				value={value}
				min={0}
				data-index={i}
				onChange={updateLevel}
			></input>
		</td>
	);

	// Convert 'levels' objects into table rows
	const LevelsList = levels.map((param, i) => {
		const { label, intensity, rest, id } = param;
		return (
			<tr key={id}>
				{/* Remove btn */}
				<td>
					<button onClick={removeLevel} data-index={i} children="-" />
				</td>
				{LevelInput("label", "text", label, i)}
				{LevelInput("intensity", "number", intensity, i)}
				{LevelInput("rest", "number", rest, i)}
			</tr>
		);
	});

	return (
		<section className="row-form__section">
			{!!levels.length && (
				<table>
					{/* Labels */}
					<thead>
						<tr>
							<th>{/* empty */}</th>
							<th className="levels-section__label">Label</th>
							<th className="levels-section__label">Intensity</th>
							<th className="levels-section__label">Recovery</th>
						</tr>
					</thead>

					{/* LevelsList */}
					<tbody>{LevelsList}</tbody>
				</table>
			)}

			{/* Button */}
			<div className="levels-section__row">
				<button className="levels-section__button" onClick={addLevel}>
					New level
				</button>
			</div>
		</section>
	);
};

export default LevelsSection;
