import React from "react";
import { connect } from "react-redux";

import { clearError } from "state/error/error.actions";
import { getErrorMessage } from "state/error/error.selectors";

import Alert from "./alert";

const mapStateToProps = (state) => ({
	errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearError: () => dispatch(clearError()),
});

const AlertContainer = (props) => <Alert {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
