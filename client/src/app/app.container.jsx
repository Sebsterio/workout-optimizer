import React from "react";
import { connect } from "react-redux";

import { loadUser } from "../redux/user/user.actions";

import App from "./app";

//------------------------------------------------------------------------------

const mapStateToProps = (state) => ({
	isAuthenticated: state.user.isAuthenticated,
	isIncognito: state.user.isIncognito,
	isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
	loadUser: () => dispatch(loadUser()),
});

const AppContainer = (props) => {
	return <App {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
