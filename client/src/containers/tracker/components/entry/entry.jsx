import React from "react";
import {
	getCompletion,
	getIntensity,
	getRestLevelStyles,
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

	// Entry element (main container)
	let entryClass = "entry";
	let entryStyles = {};
	if (isPickingDate) entryClass += " entry--selecting";
	if (intensity >= 0) entryClass += " entry--activity";
	else if (restLevel) {
		entryClass += ` entry--recovery`;
		entryStyles = getRestLevelStyles(restLevel);
	}

	// Intensity element (overlay, stretched)
	const intensityClass = `entry__exercise entry__exercise--intensity-${getIntensity(
		intensity
	)}`;

	// Details elements (strings, centered)
	const detailsClass = `entry__details entry__details--${getCompletion(
		details
	)}`;

	return (
		<div className={entryClass} style={entryStyles} onClick={handleClick}>
			{/* Intensity marker */}
			{intensity >= 0 && <div className={intensityClass} />}

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
