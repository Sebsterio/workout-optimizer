import React from "react";
import "./block.scss";

export const Block = ({
	children,
	oneField,
	twoFields,
	threeFields,
	highlight,
	greyedOut,
}) => {
	let classes = "block";
	if (highlight) classes += " block--highlight";
	if (greyedOut) classes += " block--greyed-out";
	if (oneField) classes += " block--one-field";
	if (twoFields) classes += " block--two-fields";
	if (threeFields) classes += " block--three-fields";

	return <div className={classes}>{children}</div>;
};

export default Block;
