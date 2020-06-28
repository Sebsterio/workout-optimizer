import React, { useState } from "react";

import ButtonsRow from "./subcomponents/buttons-row/buttons-row";
import LevelsRow from "./subcomponents/levels-row/levels-row";
import DetailsRow from "./subcomponents/details-row/details-row";
import NotesRow from "./subcomponents/notes-row/notes-row";
import Separator from "../separator/separator";

import "./log-form.scss";

const LogForm = ({
	cellData: { field, dateStr, stats },
	updateLog,
	updateMaxCustomRest,
	closeModal,
}) => {
	const [notes, setNotes] = useState(stats ? stats.notes : "");
	const [details, setDetails] = useState(stats ? stats.details : []);
	const [intensity, setIntensity] = useState(stats ? stats.intensity : 0);
	const [rest, setRest] = useState(stats ? stats.rest : 0);

	const entryExists = !!stats;

	// Update intensity or rest in local state
	const updateCustomLevels = (e) => {
		if (e.target.name === "intensity") setIntensity(Number(e.target.value));
		else if (e.target.name === "rest") setRest(Number(e.target.value));
	};

	// Save custom rest in redux to inform Fields about custom max rest
	const checkCustomRest = (standardRest) => {
		// Ignore if rest is non-custom or hasn't changed
		if (standardRest >= 0) return;
		if (!!stats && rest === stats.rest) return;

		updateMaxCustomRest({ field, rest });
	};

	// Update log entry in redux & db
	const handleSubmit = (e, newIntensity, newRest) => {
		e.preventDefault();
		const newStats = {
			intensity: newIntensity >= 0 ? newIntensity : intensity,
			rest: newRest >= 0 ? newRest : rest,
		};
		if (details.length) newStats.details = details;
		if (notes.length) newStats.notes = notes;
		updateLog({ dateStr, field, stats: newStats });
		checkCustomRest(newRest);
		closeModal();
	};

	// Delete log entry in redux & db
	const handleDelete = (e) => {
		e.preventDefault();
		updateLog({ field, dateStr, stats: "DELETE" });
		closeModal();
	};

	return (
		<form className="log-form" action="">
			<h1 className="modal__title">
				{entryExists ? "Edit Exercise" : "New Exercise"}
			</h1>

			<div className="log-form__sub-title">
				<span>{field.name}</span>
				<span>|</span>
				<span>{dateStr}</span>
			</div>

			{field.description && (
				<div className="log-form__description">{field.description}</div>
			)}

			<NotesRow notes={notes} setNotes={setNotes} />

			<Separator text="Exercise details" />
			<DetailsRow field={field} details={details} setDetails={setDetails} />

			<Separator text="Intensity and rest" />
			<LevelsRow
				field={field}
				intensity={intensity}
				rest={rest}
				updateCustomLevels={updateCustomLevels}
				handleSubmit={handleSubmit}
			/>

			<Separator />
			<ButtonsRow
				entryExists={entryExists}
				handleSubmit={handleSubmit}
				handleDelete={handleDelete}
				closeModal={closeModal}
			/>
		</form>
	);
};

export default LogForm;
