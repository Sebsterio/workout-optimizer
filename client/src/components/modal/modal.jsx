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
	const [notes, setNotes] = useState(stats ? stats.notes : "");
	const [details, setDetails] = useState(stats ? stats.details : []);
	const [intensity, setIntensity] = useState(stats ? stats.rest : 0);
	const [rest, setRest] = useState(stats ? stats.rest : 0);

	// Update log entry
	const handleSubmit = (newIntensity, newRest) => {
		updateLog({
			field,
			dateStr,
			stats: {
				intensity: newIntensity ? newIntensity : intensity,
				rest: newRest ? newRest : rest,
				details,
				notes,
			},
		});
		closeModal();
	};

	const handleDelete = () => {
		// e.preventDefault();
		updateLog({ field, dateStr, stats: "DELETE" });
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
					<DetailsRow field={field} details={details} setDetails={setDetails} />
					<LevelsRow
						field={field}
						intensity={intensity}
						rest={rest}
						setIntensity={setIntensity}
						setRest={setRest}
						handleSubmit={handleSubmit}
					/>
					<ButtonsRow
						handleSubmit={handleSubmit}
						handleDelete={handleDelete}
						closeModal={closeModal}
					/>
				</form>
			</div>
		</div>
	);
};

export default Modal;
