import React from "react";
import { connect } from "react-redux";
import { getCurrentProgram } from "redux/programs/programs.selectors";
import { openModal } from "redux/modal/modal.actions";

import SideField from "./side-field";

const mapStateToProps = (state) => ({
	program: getCurrentProgram(state),
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const SideFieldContainer = (props) => <SideField {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SideFieldContainer);
