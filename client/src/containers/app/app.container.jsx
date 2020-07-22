import React from "react";
import { connect } from "react-redux";

import {
	getIsAuthenticated,
	getIsIncognito,
	getIsLoading,
} from "redux/user/user.selectors";

import { loadUser } from "redux/user/user.operations";

import App from "./app";

//------------------------------------------------------------------------------

const mapStateToProps = (state) => ({
	isAuthenticated: getIsAuthenticated(state),
	isIncognito: getIsIncognito(state),
	isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
	loadUser: () => dispatch(loadUser()),
});

const AppContainer = (props) => {
	return <App {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
