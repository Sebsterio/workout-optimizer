import React from "react";

import "./field.scss";

const Field = ({ dateStr, field, stats, restLevel, openModal }) => {
	let intensity, details;
	if (stats) ({ intensity, details } = stats);

	if (!intensity && details) intensity = 1;

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
		<div
			className={fieldClass}
			onClick={() => openModal({ dateStr, field, stats })}
		>
			{plan && <div className={planClass}></div>}
			{intensity && (
				<div className={exerciseClass}>
					{details && (
						<div className="field__details">
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
			)}
		</div>
	);
};

export default Field;
