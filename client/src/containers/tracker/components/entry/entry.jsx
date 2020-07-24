import React from "react";
import {
	getCompletion,
	getIntensity,
	getRestLevel,
	getDetailsString,
} from "./entry.utils";
import "./entry.scss";

const Entry = ({
	dateStr,
	dateOffset,
	field,
	stats,
	restLevel,
	openModal,
	isPickingDate,
	datePicked,
}) => {
	let intensity, details;
	if (stats) ({ intensity, details } = stats);

	const handleClick = () => {
		if (isPickingDate) datePicked({ dateStr, field });
		else
			openModal({
				mode: "log-entry",
				data: { dateStr, dateOffset, field, stats },
			});
	};

	let fieldClass = "entry";
	if (intensity >= 0) fieldClass += " entry--active";
	if (restLevel)
		fieldClass += ` entry--recovery entry--recovery-${getRestLevel(restLevel)}`;
	if (isPickingDate) fieldClass += " entry--selecting";

	const exerciseClass = `entry__exercise entry__exercise--intensity-${getIntensity(
		intensity
	)}`;

	const detailsClass = `entry__details entry__details--${getCompletion(
		details
	)}`;

	return (
		<div className={fieldClass} onClick={handleClick}>
			{/* Intensity marker */}
			{intensity >= 0 && <div className={exerciseClass}> </div>}

			{/* Details strings */}
			{details && (
				<div className={detailsClass}>
					{details.map((entry, i) => (
						<div className="entry__details-line" key={i}>
							{getDetailsString(entry, field)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Entry;
