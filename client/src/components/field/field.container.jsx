import React from "react";
import { connect } from "react-redux";

import {
	makeGetIntensity,
	makeGetRestLevel,
} from "../../redux/log/log.selectors";
import { openModal } from "../../redux/modal/modal.actions";

import Field from "./field";

const makeMapStateToProps = () => {
	const getIntensity = makeGetIntensity();
	const getRestLevel = makeGetRestLevel();

	return (state, props) => ({
		intensity: getIntensity(state, props),
		restLevel: getRestLevel(state, props),
	});
};

const mapDispatchToProps = (dispatch, props) => ({
	openModal: () => dispatch(openModal(props)),
});

const FieldContainer = (props) => <Field {...props} />;

export default connect(makeMapStateToProps, mapDispatchToProps)(FieldContainer);
