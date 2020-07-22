import React from "react";
import { connect } from "react-redux";

import { updateLogEntry } from "redux/log/log.operations";
import { modifyMaxCustomRest } from "redux/programs/programs.actions";
import { pickDate } from "redux/modal/modal.actions";

import LogEntryMenu from "./log-entry-menu";

const mapDispatchToProps = (dispatch) => ({
	updateLogEntry: (data) => dispatch(updateLogEntry(data)),
	modifyMaxCustomRest: (data) => dispatch(modifyMaxCustomRest(data)),
	pickDate: () => dispatch(pickDate()),
});

const LogEntryMenuContainer = (props) => <LogEntryMenu {...props} />;

export default connect(null, mapDispatchToProps)(LogEntryMenuContainer);
