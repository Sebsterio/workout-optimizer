import React from "react";
import { connect } from "react-redux";

import { getUser } from "redux/user/user.selectors";

import { skipAuth } from "redux/user/user.actions";
import { logout } from "redux/user/user.operations";
import { clearError } from "redux/error/error.actions";

import AccountPage from "./account.page";

const mapStateToProps = (state) => ({
	user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
	skipAuth: () => dispatch(skipAuth()),
	logout: () => dispatch(logout()),
	clearError: () => dispatch(clearError()),
});

const AccountPageContainer = (props) => <AccountPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPageContainer);
