import React from "react";
import { connect } from "react-redux";

import { updateLogEntry } from "redux/log/log.operations";
import { updateMaxCustomRest } from "redux/program/program.actions";
import { pickDate } from "redux/modal/modal.actions";

import LogEntryMenu from "./log-entry-menu";

const mapDispatchToProps = (dispatch) => ({
	updateLogEntry: (data) => dispatch(updateLogEntry(data)),
	updateMaxCustomRest: (data) => dispatch(updateMaxCustomRest(data)),
	pickDate: () => dispatch(pickDate()),
});

const LogEntryMenuContainer = (props) => <LogEntryMenu {...props} />;

export default connect(null, mapDispatchToProps)(LogEntryMenuContainer);
