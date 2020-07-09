import React from "react";
import "./options.scss";

const clearCache = () => localStorage.clear();

const OptionsPage = () => {
	return (
		<div className="page options">
			<div className="options__wrapper">
				<button className="options__btn" onClick={clearCache}>
					Clear Cache
				</button>
			</div>
		</div>
	);
};

export default OptionsPage;
