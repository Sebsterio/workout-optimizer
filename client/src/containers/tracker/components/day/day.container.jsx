import React from "react";
import { connect } from "react-redux";
import Day from "./day";

const mapStateToProps = (store) => ({
	fields: store.program.fields,
});

const DayContainer = (props) => <Day {...props} />;

export default connect(mapStateToProps)(DayContainer);
