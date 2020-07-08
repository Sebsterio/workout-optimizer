import React from "react";

export const ToggleButton = ({ handler, children }) => (
	<button className="toggle-button levels-row__item" onClick={handler}>
		{children}
	</button>
);
