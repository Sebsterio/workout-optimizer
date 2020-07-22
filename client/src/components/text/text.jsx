import React from "react";
import "./text.scss";

export const Text = ({ children, size, secondary, center, right }) => {
	let classes = "text";
	if (size) classes += " text--" + size;
	if (secondary) classes += " text--secondary";
	if (center) classes += " text--center";
	if (right) classes += " text--right";

	return <p className={classes}>{children}</p>;
};

export default Text;
