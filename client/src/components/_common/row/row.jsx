import React from "react";
import "./row.scss";

export const Row = ({ children, spread, center, stretch, even, wrap }) => {
	let classes = "row";
	if (wrap) classes += " row--wrap";
	if (spread) classes += " row--spread";
	if (stretch) classes += " row--stretch";
	if (center) classes += " row--center";
	if (even) classes += " row--even";

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
