import React from "react";
import "./col.scss";

export const Col = ({ children, marginRight }) => {
	let classes = "column";
	if (marginRight) classes += " column--margin-right";

	return (
		<div className={classes}>
			{React.Children.map(children, (child) => (
				<div className="column__item">{child}</div>
			))}
		</div>
	);
};

export default Col;
