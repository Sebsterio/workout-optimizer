import React from "react";

import "./mini-spinner.scss";

const MiniSpinner = ({
	isLogSyncing,
	isLogSynced,
	isProgramSyncing,
	isProgramSynced,
}) => {
	return (
		<div className="mini-spinner">
			{(isLogSyncing || isProgramSyncing) && "Syncing..."}
			{isLogSynced && isProgramSynced && "Synced"}
		</div>
	);
};

export default MiniSpinner;
