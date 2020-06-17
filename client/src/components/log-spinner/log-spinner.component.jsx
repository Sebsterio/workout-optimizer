import React from "react";

import "./log-spinner.scss";

const LogSpinner = ({ isSyncing, isSynced }) => {
	return (
		<div className="log-spinner">
			{isSyncing && "Syncing..."}
			{isSynced && "Synced"}
		</div>
	);
};

export default LogSpinner;
