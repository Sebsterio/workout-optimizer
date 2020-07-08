import React from "react";
import { connect } from "react-redux";

import { updateProtocol } from "../../redux/protocol/protocol.actions";

import AreaMenu from "./area-menu";

const mapStateToProps = (state) => ({
	fields: state.protocol.fields,
});

const mapDispatchToProps = (dispatch) => ({
	updateProtocol: (data) => dispatch(updateProtocol(data)),
});

const AreaMenuContainer = (props) => <AreaMenu {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AreaMenuContainer);
