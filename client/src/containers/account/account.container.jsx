import React from "react";
import { connect } from "react-redux";

import { clearError } from "state/error/error.actions";
import { skipAuth } from "state/user/user.actions";
import { logout } from "state/user/user.operations";
import { getUser } from "state/user/user.selectors";

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageContainer);
