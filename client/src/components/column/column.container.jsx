import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectAreas } from "../../redux/protocol/protocol.selectors";

import Column from "./column";

const mapStateToProps = createStructuredSelector({
	areas: (state) => selectAreas(state),
});

const ColumnContainer = (props) => <Column {...props} />;

export default connect(mapStateToProps)(ColumnContainer);
