import React from "react";

import "./field.scss";

const Field = (props) => {
	const { intensity, restLevel, openModal } = props;

	const plan = intensity < 0;

	let fieldClass = "field";
	if (intensity)
		fieldClass += " field--intensity field--intensity-" + intensity;
	if (restLevel > 0)
		fieldClass += " field--recovery field--recovery-" + restLevel;

	const planClass = "field__plan";
	const exerciseClass =
		"field__exercise field__exercise--intensity-" + intensity;

	return (
		<div className={fieldClass} onClick={openModal}>
			{plan && <div className={planClass}></div>}
			{intensity && <div className={exerciseClass}></div>}
		</div>
	);
};

export default Field;
