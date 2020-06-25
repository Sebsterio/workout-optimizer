import React, { useState } from "react";
import "./details-row.scss";

// Convert protocol field labels into a default newEntry object
const getNewEntryDefaults = (field, done) =>
	field.details.reduce((acc, cur) => {
		const { label, defaultVal } = cur;
		acc[label] = label === "done" ? done : defaultVal;
		return acc;
	}, {});

// ---------------------- Component ------------------------

const DetailsRow = ({ field, details, setDetails }) => {
	const addEntry = (e, done) => {
		e.preventDefault();
		setDetails([...details, getNewEntryDefaults(field, done)]);
	};

	const updateEntry = ({ e, i, label, type }) => {
		const newDetails = [...details];
		const newValue =
			type === "checkbox"
				? e.target.checked
				: type === "number"
				? Number(e.target.value)
				: e.target.value;

		newDetails[i][label] = newValue;
		setDetails(newDetails);
	};

	const removeEntry = (e) => {
		e.preventDefault();
		const newDetails = [...details];
		const index = e.target.dataset.index;
		newDetails.splice(index, 1);
		setDetails(newDetails);
	};

	// ---------------------- Labels -----------------------

	// Make header labels from protocol field
	const Labels = (
		<div className="details-row__labels">
			<button style={{ opacity: 0 }}></button> {/* dummy */}
			{field.details.map((detail) => (
				<span className="details-row__label" key={detail.label}>
					{detail.label}
				</span>
			))}
		</div>
	);

	// ----------------------- Entries ------------------------

	// Convert entry values to input elements
	const EntryItem = ({ entry, i, detail: { label, type } }) =>
		type === "checkbox" ? (
			<input
				className="details-row__value"
				type="checkbox"
				name={label}
				checked={entry[label]}
				value={entry[label]}
				key={label}
				onChange={(e) => updateEntry({ e, i, label, type })}
			></input>
		) : (
			<input
				className="details-row__value"
				type={type}
				name={label}
				value={entry[label]}
				key={label}
				onChange={(e) => updateEntry({ e, i, label, type })}
			></input>
		);

	// Convert 'details' entries from log to rows
	const EntriesList = details.map((entry, i) => (
		<div className="details-row__values" key={i}>
			<button onClick={removeEntry} data-index={i}>
				-
			</button>
			{field.details.map((detail) => EntryItem({ entry, i, detail }))}
		</div>
	));

	// ---------------------- New Entry Buttons ----------------------

	const Buttons = (
		<div className="details-row__buttons">
			<button
				className="details-row__button"
				onClick={(e) => addEntry(e, false)}
			>
				New plan
			</button>
			<button
				className="details-row__button"
				onClick={(e) => addEntry(e, true)}
			>
				New exercise
			</button>
		</div>
	);

	// ---------------------- Render -----------------------

	return (
		<div className="details-row">
			{!!details.length && Labels}
			{EntriesList}
			{Buttons}
		</div>
	);
};

export default DetailsRow;
