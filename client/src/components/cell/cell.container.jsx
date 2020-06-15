import React from "react";
import { connect } from "react-redux";

import {
	makeGetIntensity,
	makeGetRestLevel,
} from "../../redux/log/log.selectors";
import { addEntry } from "../../redux/log/log.actions";
import { openModal } from "../../redux/modal/modal.actions";

import Cell from "./cell";

const makeMapStateToProps = () => {
	const getIntensity = makeGetIntensity();
	const getRestLevel = makeGetRestLevel();

	return (state, props) => ({
		intensity: getIntensity(state, props),
		restLevel: getRestLevel(state, props),
	});
};

const mapDispatchToProps = (dispatch) => ({
	addEntry: (data) => dispatch(addEntry(data)),
	openModal: (data) => dispatch(openModal(data)),
});

const CellContainer = (props) => <Cell {...props} />;

export default connect(makeMapStateToProps, mapDispatchToProps)(CellContainer);
