import React from "react";

import "./toggle-button.scss";

export const ToggleButton = ({ handler, text }) => (
	<button className="toggle-button levels-row__item" onClick={handler}>
		{text}
	</button>
);
