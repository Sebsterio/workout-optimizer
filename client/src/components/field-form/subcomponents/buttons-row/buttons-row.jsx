import React from "react";

import "./buttons-row.scss";

const ButtonsRow = ({
	entryExists,
	handleSubmit,
	handleDelete,
	closeModal,
}) => (
	<div className="buttons-row">
		<button
			className={"buttons-row__button buttons-row__button--delete"}
			onClick={handleDelete}
			disabled={!entryExists}
		>
			Delete
		</button>

		<button
			className="buttons-row__button buttons-row__button--reschedule"
			onClick={(e) => e.preventDefault()}
			disabled={!entryExists}
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
			onClick={handleSubmit}
		>
			Save
		</button>
	</div>
);

export default ButtonsRow;
