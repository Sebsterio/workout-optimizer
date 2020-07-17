import React from "react";
import { connect } from "react-redux";
import { updateCurrentProgram } from "redux/program/program.operations";
import AreaMenu from "./area-menu";

const mapStateToProps = (state) => ({
	fields: state.program.fields,
});

const mapDispatchToProps = (dispatch) => ({
	updateCurrentProgram: (data) => dispatch(updateCurrentProgram(data)),
});

const AreaMenuContainer = (props) => <AreaMenu {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AreaMenuContainer);
