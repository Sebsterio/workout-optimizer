import React from "react";
import { connect } from "react-redux";

import { addEntry } from "../../redux/log/log.actions";
import { closeModal } from "../../redux/modal/modal.actions";

import Modal from "./modal";

const mapStateToProps = (state) => ({
	cellData: state.modal.cellData,
});

const mapDispatchToProps = (dispatch) => ({
	addEntry: (data) => dispatch(addEntry(data)),
	closeModal: () => dispatch(closeModal()),
});

const ModalContainer = (props) => <Modal {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
