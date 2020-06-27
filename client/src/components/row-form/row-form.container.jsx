import React from "react";
import { connect } from "react-redux";

import RowForm from "./row-form";

const mapDispatchToProps = (dispatch) => ({
	// updateProtocol: (data) => dispatch(updateProtocol(data)),
	updateProtocol: (data) => console.log("UPDATE_PROTOCOL--STUB: ", data),
});

const RowFormContainer = (props) => <RowForm {...props} />;

export default connect(null, mapDispatchToProps)(RowFormContainer);
