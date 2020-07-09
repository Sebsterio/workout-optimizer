import React from "react";
import { connect } from "react-redux";
import { openModal } from "redux/modal/modal.actions";
import SideField from "./side-field";

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const SideFieldContainer = (props) => <SideField {...props} />;

export default connect(null, mapDispatchToProps)(SideFieldContainer);
