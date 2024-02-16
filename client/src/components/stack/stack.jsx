import React from "react";

import "./stack.scss";

/****************************************************
 * Content: column with an even gap between children
 ****************************************************/

export const Stack = ({ children, compact }) => {
	let classes = "stack";
	if (compact) classes += " stack--compact";

	return <div className={classes}>{children}</div>;
};
