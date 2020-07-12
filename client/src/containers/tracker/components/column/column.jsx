import React from "react";
import "./column.scss";

const Column = ({
	head /* Arr */,
	body /* Arr */,
	isSide /* Bool */,
	isToday /* Bool */,
}) => {
	let classes = "tracker-column";
	if (isSide) classes += " tracker-column--side";
	if (isToday) classes += " tracker-column--today";

	return (
		<div className={classes}>
			<div className="tracker-column__head">
				{head.map((item, i) => (
					<span className="tracker-column__head-item" key={i}>
						{item}
					</span>
				))}
			</div>

			<div className="tracker-column__body">
				{body.map((cell, i) => (
					<div className="tracker-column__cell" key={i}>
						{cell}
					</div>
				))}
			</div>
		</div>
	);
};

export default Column;
