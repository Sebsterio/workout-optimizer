import React from "react";
import "./page.scss";

/*************************************************
 * Fills parent
 * Scrolls vertically
 * Content wrapper: centered, grows horizontally, limited width;
 * Content: no assumptions
 *************************************************/

export const Page = ({ children }) => {
	return (
		<div className="page">
			<div className="page__content">{children}</div>
		</div>
	);
};
