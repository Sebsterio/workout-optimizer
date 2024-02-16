import React from "react";
import { connect } from "react-redux";

import { openModal } from "state/modal/modal.actions";
import { modifyProgram, publishProgram } from "state/programs/programs.operations";
import { getEditedProgram } from "state/programs/programs.selectors";

import ProgramMenu from "./program-menu";

const mapStateToProps = (state) => ({
	program: getEditedProgram(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	modify: (data) => dispatch(modifyProgram(data)),
	publish: () => dispatch(publishProgram(props.program)),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramMenuContainer = (props) => <ProgramMenu {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramMenuContainer);
