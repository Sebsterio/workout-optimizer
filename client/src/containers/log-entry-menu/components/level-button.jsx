import React from "react";

import "./level-button.scss";

export const LevelButton = ({ label, intensity, rest, handleSubmit, isActive }) => {
	const classes =
		"level-button" +
		" level-button--level-" +
		(intensity <= 3 ? intensity : "3") +
		(isActive ? " level-button--current" : "");

	const getRestMsg = (rest) => (rest > 1 ? rest + " days" : rest === 1 ? rest + " day" : "none");

	return (
		<button className={classes} onClick={(e) => handleSubmit(e, intensity, rest)}>
			<div className="level-button__label">{label}</div>
			<div className="level-button__note">Rest: {getRestMsg(rest)}</div>
		</button>
	);
};
