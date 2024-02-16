import React from "react";
import { connect } from "react-redux";

import { makeGetRestLevel, makeGetStats } from "state/log/log.selectors";
import { datePicked, openModal } from "state/modal/modal.actions";
import { getIsPickingDate } from "state/modal/modal.selectors";

import Entry from "./entry";

const makeMapStateToProps = () => {
	const getStats = makeGetStats();
	const getRestLevel = makeGetRestLevel();

	return (state, props) => ({
		// Current day log entry (including exercise rest prop)
		stats: getStats(state, props),

		// Rest level calculated from past exercises
		restLevel: getRestLevel(state, props),

		// Is entry duplication in progress
		isPickingDate: getIsPickingDate(state),
	});
};

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
	datePicked: (data) => dispatch(datePicked(data)),
});

const EntryContainer = (props) => <Entry {...props} />;

export default connect(makeMapStateToProps, mapDispatchToProps)(EntryContainer);
