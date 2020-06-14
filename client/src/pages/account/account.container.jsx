import React from "react";
import { connect } from "react-redux";

import { logout, skipAuth } from "../../redux/user/user.actions";

import AccountPage from "./account.page";

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
	skipAuth: () => dispatch(skipAuth()),
	logout: () => dispatch(logout()),
});

const AccountPageContainer = (props) => <AccountPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPageContainer);
