import React from "react";
import { connect } from "react-redux";

import { makeGetStats, makeGetRestLevel } from "../../redux/log/log.selectors";
import { openModal, datePicked } from "../../redux/modal/modal.actions";

import Field from "./field";

const makeMapStateToProps = () => {
	const getStats = makeGetStats();
	const getRestLevel = makeGetRestLevel();

	return (state, props) => ({
		isPickingDate: state.modal.isPickingDate,

		// Log entry stats (including exercise rest prop)
		stats: getStats(state, props),

		// Rest level calculated from past exercises
		restLevel: getRestLevel(state, props),
	});
};

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
	datePicked: (data) => dispatch(datePicked(data)),
});

const FieldContainer = (props) => <Field {...props} />;

export default connect(makeMapStateToProps, mapDispatchToProps)(FieldContainer);
