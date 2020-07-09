import React from "react";
import "./text.scss";

export const Text = ({ children, size, secondary, center }) => {
	let classes = "text";
	if (size) classes += " text--" + size;
	if (secondary) classes += " text--secondary";
	if (center) classes += " text--center";

	return <p className={classes}>{children}</p>;
};

export default Text;
