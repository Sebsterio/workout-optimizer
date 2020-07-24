import React from "react";
import { getClassNamesFromProps } from "utils/component";
import "./row.scss";

export const Row = (props) => {
	const { children } = props;

	const classes = getClassNamesFromProps("row", props, [
		"wrap",
		"spread",
		"stretch",
		"center",
		"even",
	]);

	return <div className={classes}>{children}</div>;
};

// export const MenuNav = ({ children }) => (
// 	<div className="menu-nav">
// 		{children.map((child, i) => (
// 			<div key={i} className="menu-nav__item">
// 				{child}
// 			</div>
// 		))}
// 	</div>
// );
