import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../redux/modal/modal.actions";

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const AsideField = ({ field, openModal }) => (
	<div
		className="aside-field"
		field={field}
		onClick={() => openModal({ field })}
	>
		{field.name}
	</div>
);

export default connect(null, mapDispatchToProps)(AsideField);
