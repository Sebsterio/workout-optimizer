import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../redux/modal/modal.actions";
import "./aside-field.scss";

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const AsideField = ({ field, openModal }) => {
	const { icon, name } = field;

	let url, size, style;

	if (icon) {
		({ url, size } = icon);

		style = {
			backgroundImage: `url(${url})`,
			backgroundSize: size,
		};
	}

	return (
		<div
			className="aside-field"
			field={field}
			onClick={() => openModal({ field, mode: "row" })}
		>
			{icon ? (
				<>
					<div className="aside-field__icon" style={style}></div>
					<div className="aside-field__name aside-field__name--small">
						{name}
					</div>
				</>
			) : (
				<div className="aside-field__name">{name}</div>
			)}
		</div>
	);
};

export default connect(null, mapDispatchToProps)(AsideField);
