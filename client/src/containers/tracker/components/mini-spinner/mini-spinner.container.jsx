import React from "react";
import { connect } from "react-redux";

import { getIsLogSynced, getIsLogSyncing } from "state/log/log.selectors";
import { getIsIncognito } from "state/user/user.selectors";

import MiniSpinner from "./mini-spinner.component";

const mapStateToProps = (state) => ({
	isLogSyncing: getIsLogSyncing(state),
	isLogSynced: getIsLogSynced(state),
	isIncognito: getIsIncognito(state),
});

const MiniSpinnerContainer = (props) => <MiniSpinner {...props} />;

export default connect(mapStateToProps)(MiniSpinnerContainer);
