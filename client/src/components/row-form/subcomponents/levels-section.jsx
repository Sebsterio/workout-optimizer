import React from "react";

// TODO: validate lable unique
// TODO: defaultVal type reflect chosen type

const newDefaultDetail = { label: "new level", intensity: 1, rest: 1 };

const LevelsSection = ({ levels, setLevels }) => {
	const addLevel = (e) => {
		e.preventDefault();
		setLevels([...levels, newDefaultDetail]);
	};

	const removeLevel = (e) => {
		e.preventDefault();
		const index = e.target.dataset.index;
		const newDetails = [...levels];
		newDetails.splice(index, 1);
		setLevels(newDetails);
	};

	const updateLevel = (e) => {
		const index = e.target.dataset.index;
		const newValue =
			e.target.type === "checkbox"
				? e.target.checked
				: e.target.type === "number"
				? Number(e.target.value)
				: e.target.value;
		const newDetails = [...levels];
		newDetails[index][e.target.name] = newValue;
		setLevels(newDetails);
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
		const { label, intensity, rest } = param;
		return (
			<tr key={label}>
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
