import React, { useState } from "react";
import {
	Menu,
	Row,
	Button,
	TextInput,
	Heading,
	Text,
	Separator,
} from "components";
import { DetailsSection, LevelsSection } from "./components";
import "./log-menu.scss";

const LogMenu = ({
	cellData: { field, dateStr, stats },
	updateLog,
	updateMaxCustomRest,
	closeModal,
	pickDate,
}) => {
	const { name, description } = field;
	const entryExists = !!stats;

	const getStat = (stat, def) => (stats && stats[stat] ? stats[stat] : def);

	const [notes, setNotes] = useState(getStat("notes", ""));
	const [details, setDetails] = useState(getStat("details", []));
	const [intensity, setIntensity] = useState(getStat("intensity", 0));
	const [rest, setRest] = useState(getStat("rest", 0));

	const handleClose = () => closeModal();

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
		updateLog({ field, dateStr, stats: "DELETE" });
		closeModal();
	};

	const handleDuplicate = (e) => {
		pickDate();
	};

	return (
		<Menu>
			<Heading>{entryExists ? "Edit Exercise" : "New Exercise"}</Heading>

			<Row even>
				<Text secondary>{name}</Text>
				<Text secondary>|</Text>
				<Text secondary>{dateStr}</Text>
			</Row>

			{description && (
				<Row>
					<Text size="small">{description}</Text>
				</Row>
			)}

			<Row stretch>
				{/* prettier-ignore */}
				<TextInput name="notes"	placeholder="Notes"	value={notes}	handler={setNotes}	/>
			</Row>

			<Separator text="Exercise details" />
			<DetailsSection {...{ field, details, setDetails }} />

			<Separator text="Intensity and rest" />
			<LevelsSection
				{...{ field, intensity, rest, setIntensity, setRest, handleSubmit }}
			/>

			<Separator />
			<Row spread>
				<Button text="Delete" handler={handleDelete} disabled={!entryExists} />
				{/* prettier-ignore */}
				<Button	text="Duplicate" handler={handleDuplicate} disabled={!entryExists} />
				<Button text="Cancel" handler={handleClose} />
				<Button text="Save" handler={handleSubmit} />
			</Row>
		</Menu>
	);
};

export default LogMenu;
