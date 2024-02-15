import React from "react";
import "./column.scss";


const Column = ({ head, body, isToday, isSide }) => {
	let classes = "tracker-column";
	if (isToday) classes += " tracker-column--today";
	if (isSide) classes += " tracker-column--side";

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
