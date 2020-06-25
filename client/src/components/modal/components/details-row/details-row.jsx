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
		const newValue = type === "checkbox" ? e.target.checked : e.target.value;
		newDetails[i][label] = newValue;
		setDetails(newDetails);
	};

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

	// ----------------------- Entries ------------------------

	const EntryInput = ({ entry, i, detail: { label, type } }) =>
		type === "checkbox" ? (
			<input
				className="details-row__input"
				type="checkbox"
				name={label}
				checked={entry[label]}
				value={entry[label]}
				key={label}
				onChange={(e) => updateEntry({ e, i, label, type })}
			></input>
		) : (
			<input
				className="details-row__input"
				type={type}
				name={label}
				value={entry[label]}
				key={label}
				onChange={(e) => updateEntry({ e, i, label, type })}
			></input>
		);

	// Convert entry values to input elements
	const EntryItem = ({ entry, i, detail }) => (
		<span className="details-row__value" key={detail.label}>
			{/* {String(entry[detail.label])} */}
			{EntryInput({ entry, i, detail })}
		</span>
	);

	// Convert 'details' entries from log to rows
	const EntriesList = details.map((entry, i) => (
		<div className="details-row__values" key={i}>
			{field.details.map((detail) => EntryItem({ entry, i, detail }))}
		</div>
	));

	// ---------------------- New Entry Buttons ----------------------

	const Button = (text, handler) => (
		<button className="details-row__button" onClick={handler}>
			{text}
		</button>
	);

	const Buttons = (
		<div className="details-row__buttons">
			{Button("Add plan", (e) => addEntry(e, false))}
			{Button("Add exercise", (e) => addEntry(e, true))}
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
