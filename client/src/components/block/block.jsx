import React from "react";
import "./block.scss";

export const Block = ({ children, wideFirstCol, oneField, highlight }) => {
	let classes = "block";
	if (wideFirstCol) classes += " block--wide-first-col";
	if (highlight) classes += " block--highlight";
	if (oneField) classes += " block--one-field";

	return <div className={classes}>{children}</div>;
};

export default Block;
