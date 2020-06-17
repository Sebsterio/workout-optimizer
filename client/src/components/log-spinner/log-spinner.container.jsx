import React from "react";
import { connect } from "react-redux";

import LogSpinner from "./log-spinner.component";

const mapStateToProps = (state) => ({
	isSyncing: state.log.isSyncing,
	isSynced: state.log.isSynced,
});

const LogSpinnerContainer = (props) => <LogSpinner {...props} />;

export default connect(mapStateToProps)(LogSpinnerContainer);
