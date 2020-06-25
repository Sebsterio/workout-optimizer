import React, { useState } from "react";
import "./details-row.scss";

// Convert protocol field labels into a default newEntry object
const getNewEntryDefaults = (field) =>
	field.details.reduce((acc, cur) => {
		const { label, defaultVal } = cur;
		acc[label] = defaultVal;
		return acc;
	}, {});

// ---------------------- Component ------------------------

const DetailsRow = ({ field, details, addSet }) => {
	const [formOpen, setFormOpen] = useState(false);
	const [newEntry, setNewEntry] = useState(getNewEntryDefaults(field));

	const toggleFormOpen = (e) => {
		e.preventDefault();
		setFormOpen(!formOpen);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addSet(newEntry);
	};

	const updateNewEntry = (e) =>
		setNewEntry({
			...newEntry,
			[e.target.name]:
				e.target.type === "checkbox" ? e.target.checked : e.target.value,
		});

	// ---------------------- Labels -----------------------

	// Make header labels from protocol field
	const Labels = (
		<div className="details-row__labels">
			{field.details.map((detail) => (
				<span className="details-row__label" key={detail.label}>
					{detail.label}
				</span>
			))}
		</div>
	);

	// -------------------- View/Edit Entry ------------------------

	const DetailsItem = ({ set, detail }) => (
		<span className="details-row__value" key={detail.label}>
			{String(set[detail.label])}
		</span>
	);

	// Display details array entries values from log
	const DetailsList = details.map((set, i) => (
		<div className="details-row__values" key={i}>
			{field.details.map((detail) => DetailsItem({ set, detail }))}
		</div>
	));

	// ---------------------- New Entry Inputs ----------------------

	console.log(details);

	const NewEntryInput = ({ label, type }) =>
		type === "checkbox" ? (
			<input
				className="details-row__input"
				type="checkbox"
				name={label}
				checked={newEntry[label]}
				value={newEntry[label]}
				key={label}
				onChange={updateNewEntry}
			></input>
		) : (
			<input
				className="details-row__input"
				type={type}
				name={label}
				value={newEntry[label]}
				key={label}
				onChange={updateNewEntry}
			></input>
		);

	// Make newEntry inputs from protocol field
	const NewEntryInputs = (
		<div className="details-row__inputs">
			{field.details.map(({ label, type }) => NewEntryInput({ label, type }))}
		</div>
	);

	// ---------------------- New Entry Buttons ----------------------

	const Button = (text, handler) => (
		<button className="details-row__button" onClick={handler}>
			{text}
		</button>
	);

	const CloseNewSetButtons = (
		<div className="details-row__buttons">
			{Button("Cancel", toggleFormOpen)}
			{Button("Add", handleSubmit)}
		</div>
	);

	const OpenNewSetButtons = (
		<div className="details-row__buttons">
			{Button("Add details", toggleFormOpen)}
		</div>
	);

	// ---------------------- Render -----------------------

	const labelsVisible = details.length || formOpen;

	return (
		<div className="details-row">
			{labelsVisible && Labels}
			{DetailsList}
			{formOpen && NewEntryInputs}
			{formOpen ? CloseNewSetButtons : OpenNewSetButtons}
		</div>
	);
};

export default DetailsRow;
