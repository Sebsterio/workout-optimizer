import React from "react";

import "./alert.scss";

const Alert = ({ errorMessage, clearError }) => {
	if (errorMessage)
		return (
			<div className="alert">
				<div className="alert__message">{errorMessage}</div>
				<div className="alert__close" onClick={clearError}>
					X
				</div>
			</div>
		);

	return null;
};

export default Alert;
