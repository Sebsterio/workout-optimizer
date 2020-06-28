import React from "react";
import { connect } from "react-redux";

import { updateLog } from "../../redux/log/log.actions";
import { updateMaxCustomRest } from "../../redux/protocol/protocol.actions";
import { pickDate } from "../../redux/modal/modal.actions";

import LogForm from "./log-form";

const mapDispatchToProps = (dispatch) => ({
	updateLog: (data) => dispatch(updateLog(data)),
	updateMaxCustomRest: (data) => dispatch(updateMaxCustomRest(data)),
	pickDate: () => dispatch(pickDate()),
});

const LogFormContainer = (props) => <LogForm {...props} />;

export default connect(null, mapDispatchToProps)(LogFormContainer);
