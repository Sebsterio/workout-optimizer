import React, { useState } from "react";
import "./details-row.scss";

// Convert array of protocol field labels into state object
const getDefaultState = (field) =>
	field.details.reduce((acc, cur) => {
		const { label, defaultVal } = cur;
		acc[label] = defaultVal;
		return acc;
	}, {});

const DetailsRow = ({ field, details, addSet }) => {
	console.log(details);
	const [formOpen, setFormOpen] = useState(false);
	const [newSet, setNewSet] = useState(getDefaultState(field));

	const toggleFormOpen = (e) => {
		e.preventDefault();
		setFormOpen(!formOpen);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addSet(newSet);
	};

	const updateNewSet = (e) =>
		setNewSet({
			...newSet,
			[e.target.name]: e.target.value,
		});

	// ---------------------- Render --------------------

	// Make header labels from protocol field
	const labels = (
		<div className="details-row__labels">
			{field.details.map((detail) => (
				<span className="details-row__label" key={detail.label}>
					{detail.label}
				</span>
			))}
		</div>
	);

	// Display details array entries values from log
	const detailsList = details.map((set, i) => (
		<div className="details-row__values" key={i}>
			{field.details.map((detail) => (
				<span className="details-row__value" key={detail.label}>
					{set[detail.label]}
				</span>
			))}
		</div>
	));

	// Make new form inputs from protocol field
	const newSetInputs = (
		<div className="details-row__inputs">
			{field.details.map(({ label, type }) => (
				<input
					className="details-row__input"
					type={type}
					name={label}
					value={newSet[label]}
					key={label}
					onChange={updateNewSet}
				></input>
			))}
		</div>
	);

	const makeButton = (text, handler) => (
		<button className="details-row__button" onClick={handler}>
			{text}
		</button>
	);

	const closeNewSetButtons = (
		<div className="details-row__buttons">
			{makeButton("Cancel", toggleFormOpen)}
			{makeButton("Add", handleSubmit)}
		</div>
	);

	const openNewSetButtons = (
		<div className="details-row__buttons">
			{makeButton("+", toggleFormOpen)}
		</div>
	);

	return (
		<div className="details-row">
			{labels} {/* show only if not empty && form not open */}
			{detailsList}
			{formOpen && newSetInputs}
			{formOpen ? closeNewSetButtons : openNewSetButtons}
		</div>
	);
};

export default DetailsRow;
