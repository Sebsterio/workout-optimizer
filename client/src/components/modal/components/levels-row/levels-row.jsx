import React from "react";

import "./levels-row.scss";

const LevelsRow = ({ field, handleSubmit }) => (
	<div className="levels-row">
		{field.levels.map(({ label, intensity, rest }) => {
			const buttonClass =
				"levels-row__button levels-row__button--level-" + intensity;
			const restMsg =
				rest > 1 ? rest + " days" : rest === 1 ? rest + " day" : "none";
			const handleClick = () => handleSubmit(intensity, rest);

			return (
				<button className={buttonClass} onClick={handleClick} key={intensity}>
					<div className="levels-row__label">{label}</div>
					<div className="levels-row__note">Rest: {restMsg}</div>
				</button>
			);
		})}
	</div>
);

export default LevelsRow;
