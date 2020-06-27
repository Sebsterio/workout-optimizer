import React from "react";
import {
	getCompletion,
	getIntensity,
	getRestLevel,
	getDetailsString,
} from "./field.utils";
import "./field.scss";

const Field = ({ dateStr, field, stats, restLevel, openModal }) => {
	let intensity, details;
	if (stats) ({ intensity, details } = stats);

	let fieldClass = "field";
	if (intensity === 0) fieldClass += " field--planned";
	if (intensity > 0) fieldClass += " field--active";
	if (restLevel) {
		fieldClass +=
			" field--recovery" + ` field--recovery-${getRestLevel(restLevel)}`;
	}

	const exerciseClass =
		"field__exercise" +
		` field__exercise--intensity-${getIntensity(intensity)}`;

	const detailsClass = `field__details field__details--${getCompletion(
		details
	)}`;

	return (
		<div
			className={fieldClass}
			onClick={() => openModal({ dateStr, field, stats, mode: "log" })}
		>
			{/* Intensity marker */}
			{intensity >= 0 && <div className={exerciseClass}> </div>}

			{/* Details strings */}
			{details && (
				<div className={detailsClass}>
					{details.map((entry, i) => (
						<div className="field__details-line" key={i}>
							{getDetailsString(entry, field)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Field;
