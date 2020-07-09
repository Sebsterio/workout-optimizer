import React from "react";

export const ToggleButton = ({ handler, text }) => (
	<button className="toggle-button levels-row__item" onClick={handler}>
		{text}
	</button>
);
