import React from "react";
import { connect } from "react-redux";

import { login, register } from "../../redux/user/user.actions";

import Form from "./form";

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
	login: (data) => dispatch(login(data)),
	register: (data) => dispatch(register(data)),
	update: (data) => {},
	connect: (data) => {},
});

const FormContainer = (props) => <Form {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
