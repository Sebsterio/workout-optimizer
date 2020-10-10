import React from "react";
import { connect } from "react-redux";

import { getIsLogSyncing, getIsLogSynced } from "redux/log/log.selectors";
import { getIsIncognito } from "redux/user/user.selectors";

import MiniSpinner from "./mini-spinner.component";

const mapStateToProps = (state) => ({
	isLogSyncing: getIsLogSyncing(state),
	isLogSynced: getIsLogSynced(state),
	isIncognito: getIsIncognito(state),
});

const MiniSpinnerContainer = (props) => <MiniSpinner {...props} />;

export default connect(mapStateToProps)(MiniSpinnerContainer);
