import React from "react";
import { connect } from "react-redux";
import { updateProgram } from "redux/program/program.operations";
import AreaMenu from "./area-menu";

const mapStateToProps = (state) => ({
	fields: state.program.fields,
});

const mapDispatchToProps = (dispatch) => ({
	updateProgram: (data) => dispatch(updateProgram(data)),
});

const AreaMenuContainer = (props) => <AreaMenu {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AreaMenuContainer);
