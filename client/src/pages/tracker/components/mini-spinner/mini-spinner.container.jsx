import React from "react";
import { connect } from "react-redux";

import LogSpinner from "./mini-spinner.component";

const mapStateToProps = (state) => ({
	isLogSyncing: state.log.isSyncing,
	isLogSynced: state.log.isSynced,
	isProtocolSyncing: state.protocol.isSyncing,
	isProtocolSynced: state.protocol.isSynced,
});

const LogSpinnerContainer = (props) => <LogSpinner {...props} />;

export default connect(mapStateToProps)(LogSpinnerContainer);
