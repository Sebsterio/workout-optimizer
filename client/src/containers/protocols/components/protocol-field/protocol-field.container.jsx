import React from "react";
import { connect } from "react-redux";

import { openModal } from "redux/modal/modal.actions";
import { updateProtocol } from "redux/protocol/protocol.actions";

import ProtocolField from "./protocol-field";

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
	updateProtocol: (data) => dispatch(updateProtocol(data)),
});

const ProtocolFieldContainer = (props) => <ProtocolField {...props} />;

export default connect(null, mapDispatchToProps)(ProtocolFieldContainer);
