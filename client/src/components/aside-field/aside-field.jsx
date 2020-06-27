import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../redux/modal/modal.actions";
import "./aside-field.scss";

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const AsideField = ({ field, openModal }) => (
	<div
		className="aside-field"
		field={field}
		onClick={() => openModal({ field, mode: "row" })}
	>
		{field.name}
	</div>
);

export default connect(null, mapDispatchToProps)(AsideField);
