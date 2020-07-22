import React from "react";
import { connect } from "react-redux";
import { getCurrentProgramFields } from "redux/programs/programs.selectors";
import Day from "./day";

const mapStateToProps = (state) => ({
	fields: getCurrentProgramFields(state),
});

const DayContainer = (props) => <Day {...props} />;

export default connect(mapStateToProps)(DayContainer);
