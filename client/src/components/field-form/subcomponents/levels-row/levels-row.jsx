import React, { useState } from "react";
import "./levels-row.scss";

const LevelsRow = (props) => {
	const { field, intensity, updateCustomLevels, handleSubmit } = props;

	const [customLevels, setCustomLevels] = useState(false);

	const toggleCustomLevels = (e) => {
		e.preventDefault();
		setCustomLevels(!customLevels);
	};

	// ---------------------- Toggle -----------------------
	const Toggle = (
		<button
			className="levels-row__button levels-row__button--toggle"
			onClick={toggleCustomLevels}
		>
			{customLevels ? "Standard" : "Custom"}
		</button>
	);
	// -------------------- Base Levels --------------------

	const getBtnClass = (btnIntensity) =>
		"levels-row__button" +
		" levels-row__button--level-" +
		btnIntensity +
		(btnIntensity === intensity ? " levels-row__button--current" : "");

	const getRestMsg = (rest) =>
		rest > 1 ? rest + " days" : rest === 1 ? rest + " day" : "none";

	const BaseLevels = field.levels.map(({ label, intensity, rest }) => (
		<button
			className={getBtnClass(intensity)}
			onClick={(e) => handleSubmit(e, intensity, rest)}
			key={intensity}
		>
			<div className="levels-row__label">{label}</div>
			<div className="levels-row__note">Rest: {getRestMsg(rest)}</div>
		</button>
	));

	// ------------------- Custom Levels -------------------

	const CustomLevels = ["intensity", "rest"].map((name) => (
		<div className="levels-row__field" key={name}>
			<label className="levels-row__field-label" htmlFor={"lrf-" + name}>
				{name}
			</label>
			<input
				className="levels-row__field-input"
				id={"lrf-" + name}
				type="number"
				name={name}
				value={props[name]}
				onChange={updateCustomLevels}
			/>
		</div>
	));

	// ---------------------- Render ----------------------

	return (
		<div className="levels-row">
			{Toggle}
			{customLevels ? CustomLevels : BaseLevels}
		</div>
	);
};
export default LevelsRow;
