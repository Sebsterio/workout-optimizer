import React from "react";
import "./text.scss";

export const Text = ({ children, size, secondary }) => {
	let classes = "text";
	if (size) classes += " text--" + size;
	if (secondary) classes += " text--secondary";

	return <p className={classes}>{children}</p>;
};

export default Text;
