import React, { useState } from "react";
import "./modal.scss";

import ButtonsRow from "./components/buttons-row/buttons-row";
import LevelsRow from "./components/levels-row/levels-row";
import DetailsRow from "./components/details-row/details-row";
import NotesRow from "./components/notes-row/notes-row";

// -------------------------------------------------------------

const Modal = ({
	cellData: { field, dateStr, stats },
	updateLog,
	closeModal,
}) => {
	const intensity = stats ? stats.intensity : null;
	const rest = stats ? stats.rest : null;
	const [details, setDetails] = useState(stats ? stats.details : []);
	const [notes, setNotes] = useState(stats ? stats.notes : "");

	const stateHasChanged = ({ newIntensity, newRest }) =>
		newIntensity !== intensity ||
		newRest !== rest ||
		details != stats.details ||
		notes != stats.notes;

	// Update log entry if has changed
	const handleSubmit = (newIntensity, newRest) => {
		if (stateHasChanged({ newIntensity, newRest }))
			updateLog({
				field,
				dateStr,
				stats: {
					intensity: newIntensity,
					rest: newRest,
					details,
					notes,
				},
			});
		else console.log("No change");
		closeModal();
	};

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				<h1 className="modal__title">Add Exercise</h1>
				<div className="modal__sub-title">
					<span>{field.name}</span>
					<span>|</span>
					<span>{dateStr}</span>
				</div>
				<form className="modal__form" action="">
					<NotesRow
						notes={notes}
						handleInput={(e) => setNotes(e.target.value)}
					/>
					<DetailsRow
						field={field}
						details={details}
						addSet={(data) => setDetails([...details, data])}
					/>
					<LevelsRow field={field} handleSubmit={handleSubmit} />
					<ButtonsRow
						handleDelete={() => handleSubmit(null)}
						closeModal={closeModal}
					/>
				</form>
			</div>
		</div>
	);
};

export default Modal;
