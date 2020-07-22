import React from "react";
import { connect } from "react-redux";
import { getCurrentProgramFields } from "redux/programs/programs.selectors";
import Column from "./side";

const mapStateToProps = (state) => ({
	fields: getCurrentProgramFields(state),
});

const ColumnContainer = (props) => <Column {...props} />;

export default connect(mapStateToProps)(ColumnContainer);
