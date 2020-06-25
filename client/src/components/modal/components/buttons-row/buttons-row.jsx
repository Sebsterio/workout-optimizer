import React from "react";

import "./buttons-row.scss";

const ButtonsRow = ({ handleSubmit, handleDelete, closeModal }) => (
	<div className="buttons-row">
		<button
			className={"buttons-row__button buttons-row__button--delete"}
			onClick={handleDelete}
		>
			Delete
		</button>

		<button
			className="buttons-row__button buttons-row__button--reschedule"
			onClick={(e) => e.preventDefault()}
		>
			Reschedule
		</button>

		<button
			className="buttons-row__button buttons-row__button--close"
			onClick={closeModal}
		>
			Cancel
		</button>
		<button
			className="buttons-row__button buttons-row__button--close"
			onClick={() => handleSubmit()}
		>
			Save
		</button>
	</div>
);

export default ButtonsRow;
