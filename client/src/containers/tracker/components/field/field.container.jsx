import React from "react";
import { connect } from "react-redux";

import { makeGetStats, makeGetRestLevel } from "redux/log/log.selectors";
import { getIsPickingDate } from "redux/modal/modal.selectors";
import { openModal, datePicked } from "redux/modal/modal.actions";

import Field from "./field";

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

const FieldContainer = (props) => <Field {...props} />;

export default connect(makeMapStateToProps, mapDispatchToProps)(FieldContainer);
