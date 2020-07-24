import React from "react";
import { getClassNamesFromProps } from "utils/component";
import "./snippet.scss";

/*************************************************
 * Block with minimum height
 * Content: row
 * 	 Non-first children take up equal space,
 * 	 Firsts child fills the rest and grows to fill height
 *************************************************/

export const Snippet = (props) => {
	const classes = getClassNamesFromProps("snippet", props, [
		"highlight",
		"greyedOut",
	]);

	const children = React.Children.toArray(props.children);
	const mainChild = children.splice(0, 1);

	return (
		<div className={classes}>
			<div className="snippet__main">{mainChild}</div>
			<div className="snippet__aside">{children}</div>
		</div>
	);
};

export default Snippet;

// todo: first child margin right
