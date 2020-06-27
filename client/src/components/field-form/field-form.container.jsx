import React from "react";
import { connect } from "react-redux";

import { updateLog } from "../../redux/log/log.actions";
import { updateMaxCustomRest } from "../../redux/protocol/protocol.actions";

import FieldForm from "./field-form";

console.log(updateLog, updateMaxCustomRest);

const mapDispatchToProps = (dispatch) => ({
	updateLog: (data) => dispatch(updateLog(data)),
	updateMaxCustomRest: (data) => dispatch(updateMaxCustomRest(data)),
});

const FieldFormContainer = (props) => <FieldForm {...props} />;

export default connect(null, mapDispatchToProps)(FieldFormContainer);
