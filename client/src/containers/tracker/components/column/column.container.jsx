import React from "react";
import { connect } from "react-redux";
import Column from "./column";

const mapStateToProps = (store) => ({
	fields: store.protocol.fields,
});

const ColumnContainer = (props) => <Column {...props} />;

export default connect(mapStateToProps)(ColumnContainer);
