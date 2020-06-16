import React from "react";
import { connect } from "react-redux";

import { clearError } from "../../redux/error/error.actions";

import Alert from "./alert";

const mapStateToProps = (state) => ({
	error: state.error.msg || state.error.id,
});

const mapDispatchToProps = (dispatch) => ({
	clearError: () => dispatch(clearError()),
});

const AlertContainer = (props) => <Alert {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
