import React from "react";
import { connect } from "react-redux";

import { updateProtocol } from "../../redux/protocol/protocol.actions";

import RowForm from "./row-form";

const mapDispatchToProps = (dispatch) => ({
	updateProtocol: (data) => dispatch(updateProtocol(data)),
});

const RowFormContainer = (props) => <RowForm {...props} />;

export default connect(null, mapDispatchToProps)(RowFormContainer);
