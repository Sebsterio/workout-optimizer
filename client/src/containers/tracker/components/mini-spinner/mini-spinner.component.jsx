import React from "react";

import syncingIcon from "assets/icons/syncing.svg";
import notSyncedIcon from "assets/icons/not_synced.svg";
import syncDisabledIcon from "assets/icons/sync_disabled.svg";
import doneIcon from "assets/icons/done.svg";

import "./mini-spinner.scss";

const MiniSpinner = ({
	isLogSyncing,
	isLogSynced,
	isProgramSyncing,
	isProgramSynced,
	isIncognito,
}) => {
	const isSyncing = isLogSyncing || isProgramSyncing;
	const isSynced = isLogSynced && isProgramSynced;
	return (
		<div className="mini-spinner">
			{isIncognito ? (
				<img
					src={syncDisabledIcon}
					alt="Sync disabled"
					className="mini-spinner__icon"
				/>
			) : isSyncing ? (
				<img
					src={syncingIcon}
					alt="Syncing"
					className="mini-spinner__icon mini-spinner__icon--spinning"
				/>
			) : !isSynced ? (
				<img
					src={notSyncedIcon}
					alt="Not synced"
					className="mini-spinner__icon"
				/>
			) : (
				<img src={doneIcon} alt="Synced" className="mini-spinner__icon" />
			)}
		</div>
	);
};

export default MiniSpinner;
