import React from "react";
import "./stack.scss";

export const Stack = () => {
	let classes = "stack";
	if (compact) classes += " stack--compact";

	return <div className={classes}>{children}</div>;
};
