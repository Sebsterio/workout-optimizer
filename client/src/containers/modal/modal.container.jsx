import React from "react";
import { connect } from "react-redux";

import { getData, getMode, getIsOpen } from "redux/modal/modal.selectors";
import { closeModal } from "redux/modal/modal.actions";

import Modal from "./modal";

const mapStateToProps = (state) => ({
	data: getData(state),
	mode: getMode(state),
	isOpen: getIsOpen(state),
});

const mapDispatchToProps = (dispatch) => ({
	closeModal: () => dispatch(closeModal()),
});

const ModalContainer = (props) => <Modal {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
