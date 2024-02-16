import React from "react";
import { connect } from "react-redux";

import { updateLogEntry } from "state/log/log.operations";
import { pickDate } from "state/modal/modal.actions";
import { modifyMaxCustomRest } from "state/programs/programs.actions";

import LogEntryMenu from "./log-entry-menu";

const mapDispatchToProps = (dispatch) => ({
	updateLogEntry: (data) => dispatch(updateLogEntry(data)),
	modifyMaxCustomRest: (data) => dispatch(modifyMaxCustomRest(data)),
	pickDate: () => dispatch(pickDate()),
});

const LogEntryMenuContainer = (props) => <LogEntryMenu {...props} />;

export default connect(null, mapDispatchToProps)(LogEntryMenuContainer);
