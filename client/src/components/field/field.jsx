import React from "react";
import { getCompletion } from "./field.utils";
import "./field.scss";

const Field = ({ dateStr, field, stats, restLevel, openModal }) => {
	let intensity, details;
	if (stats) ({ intensity, details } = stats);

	let fieldClass = "field";
	if (intensity === 0) fieldClass += " field--planned";
	if (intensity > 0) fieldClass += " field--active";
	if (restLevel) {
		fieldClass += " field--recovery";
		fieldClass += " field--recovery-" + (restLevel < 3 ? restLevel : "3");
	}

	const exerciseClass =
		"field__exercise field__exercise--intensity-" + intensity;

	const detailsClass =
		"field__details field__details--" + getCompletion(details);

	return (
		<div
			className={fieldClass}
			onClick={() => openModal({ dateStr, field, stats })}
		>
			{intensity >= 0 && <div className={exerciseClass}> </div>}

			{details && (
				<div className={detailsClass}>
					{details.map((entry, i) => (
						<div className="field__details-line" key={i}>
							{Object.values(entry)
								.filter((val) => typeof val !== "boolean")
								.join("-")}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Field;
