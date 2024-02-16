import React from "react";

import "./menu.scss";

/*************************************************
 * Grows vertically to contain children, limited height
 * Header & footer: optional, non-scrollable
 * Content container: Grows vertically to fill free space,
 *   overflow Y-scrollable
 *************************************************/

export const Menu = ({ size = "xl", header, footer, children }) => {
	return (
		<div className={`menu menu--h-${size}`}>
			{header && <div className="menu__header">{header}</div>}

			<div className="menu__content">{children}</div>

			{footer && <div className="menu__footer">{footer}</div>}
		</div>
	);
};

export default Menu;
