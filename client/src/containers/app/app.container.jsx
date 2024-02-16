import React from "react";
import { connect } from "react-redux";

import { loadUser } from "state/user/user.operations";
import { getIsAuthenticated, getIsIncognito, getIsLoading } from "state/user/user.selectors";

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
