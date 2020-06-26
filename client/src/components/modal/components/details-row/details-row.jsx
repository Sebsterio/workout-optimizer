import React from "react";
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
		<tr>
			<th>{/* empty */}</th>
			{field.details.map((detail) => (
				<th className="details-row__label" key={detail.label}>
					{detail.label}
				</th>
			))}
		</tr>
	);

	// ----------------------- Entries ------------------------

	// Convert entry values to input elements
	const EntryItem = ({ entry, i, label, type }) =>
		type === "checkbox" ? (
			<input
				className="details-row__item"
				type="checkbox"
				name={label}
				checked={entry[label]}
				value={entry[label]}
				onChange={(e) => updateEntry({ e, i, label, type })}
			></input>
		) : (
			<input
				className="details-row__item"
				type={type}
				name={label}
				value={entry[label]}
				onChange={(e) => updateEntry({ e, i, label, type })}
			></input>
		);

	const RemoveBtn = (i) => (
		<button onClick={removeEntry} data-index={i}>
			-
		</button>
	);

	// Convert 'details' entries from log into table rows
	const Entries = details.map((entry, i) => (
		<tr key={i}>
			<td>{RemoveBtn(i)}</td>
			{field.details.map(({ label, type }) => (
				<td key={label}>{EntryItem({ entry, i, label, type })}</td>
			))}
		</tr>
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
			{!!details.length && (
				<table>
					<thead>{Labels}</thead>
					<tbody>{Entries}</tbody>
				</table>
			)}
			{Buttons}
		</div>
	);
};

export default DetailsRow;
