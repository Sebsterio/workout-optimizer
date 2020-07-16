import React from "react";
import { connect } from "react-redux";

import { updateLogEntry } from "redux/log/log.operations";
import { updateMaxCustomRest } from "redux/program/program.actions";
import { pickDate } from "redux/modal/modal.actions";

import LogMenu from "./log-menu";

const mapDispatchToProps = (dispatch) => ({
	updateLogEntry: (data) => dispatch(updateLogEntry(data)),
	updateMaxCustomRest: (data) => dispatch(updateMaxCustomRest(data)),
	pickDate: () => dispatch(pickDate()),
});

const LogMenuContainer = (props) => <LogMenu {...props} />;

export default connect(null, mapDispatchToProps)(LogMenuContainer);
