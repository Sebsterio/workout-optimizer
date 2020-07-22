import React from "react";
import { connect } from "react-redux";

import { getErrorMessage } from "redux/error/error.selectors";

import { clearError } from "redux/error/error.actions";

import Alert from "./alert";

const mapStateToProps = (state) => ({
	errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearError: () => dispatch(clearError()),
});

const AlertContainer = (props) => <Alert {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
