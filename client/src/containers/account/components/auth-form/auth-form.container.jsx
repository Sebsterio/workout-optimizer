import React from "react";
import { connect } from "react-redux";

import { login, register, closeAccount } from "redux/user/user.actions";

import Form from "./auth-form";

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
	login: (data) => dispatch(login(data)),
	register: (data) => dispatch(register(data)),
	update: () => {},
	connect: () => {},
	remove: (data) => dispatch(closeAccount(data)),
});

const AuthFormContainer = (props) => <Form {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);
