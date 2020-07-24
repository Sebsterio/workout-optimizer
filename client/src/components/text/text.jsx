import React from "react";
import { getClassNamesFromProps } from "utils/component";
import "./text.scss";

export const Text = (props) => {
	const { children } = props;

	const classes = getClassNamesFromProps("text", props, [
		["size", "value-only"], // get prop value, not name
		"secondary",
		"center",
		"right",
	]);

	return <p className={classes}>{children}</p>;
};

export default Text;
