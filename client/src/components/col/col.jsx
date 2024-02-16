import React from "react";

import "./col.scss";

/*************************************************
 * Flex column
 * Content: children strech to fill height and width
 * Child-content: stretched
 *************************************************/

export const Col = ({ children, firstChildDominant }) => {
	let classes = "column";
	if (firstChildDominant) classes += " column--firstChildDominant";

	return (
		<div className={classes}>
			{React.Children.map(children, (child) => (
				<div className="column__item">{child}</div>
			))}
		</div>
	);
};

export default Col;
