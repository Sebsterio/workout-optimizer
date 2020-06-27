import React from "react";

const ButtonsSection = ({ handleSubmit, closeModal }) => (
	<div className="buttons-section">
		<button
			className="buttons-section__button buttons-section__button--close"
			onClick={closeModal}
		>
			Cancel
		</button>
		<button
			className="buttons-section__button buttons-section__button--close"
			onClick={handleSubmit}
		>
			Save
		</button>
	</div>
);

export default ButtonsSection;
