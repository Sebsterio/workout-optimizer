import React from "react";
import "./block.scss";

export const Block = ({ children, wideFirstCol }) => {
	let classes = "block";
	if (wideFirstCol) classes += " block--wide-first-col";

	return <div className={classes}>{children}</div>;
};

export default Block;
