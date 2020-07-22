import React from "react";
import { connect } from "react-redux";
import { modifyProgram } from "redux/programs/programs.operations";
import ProgramFieldMenu from "./program-field-menu";

const mapDispatchToProps = (dispatch) => ({
	modifyProgram: (data) => dispatch(modifyProgram(data)),
});

const ProgramFieldMenuContainer = (props) => <ProgramFieldMenu {...props} />;

export default connect(null, mapDispatchToProps)(ProgramFieldMenuContainer);
