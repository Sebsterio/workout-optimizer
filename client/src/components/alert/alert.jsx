import React from "react";

import "./alert.scss";

const Alert = ({ error, clearError }) => {
	console.log("Alert ", error);
	if (error)
		return (
			<div className="alert">
				<div className="alert__message">{error}</div>
				<div className="alert__close" onClick={clearError}>
					X
				</div>
			</div>
		);

	return null;
};

export default Alert;
