import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../../redux/modal/modal.actions";
import ProtocolField from "./protocol-field";

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const ProtocolFieldContainer = (props) => <ProtocolField {...props} />;

export default connect(null, mapDispatchToProps)(ProtocolFieldContainer);
