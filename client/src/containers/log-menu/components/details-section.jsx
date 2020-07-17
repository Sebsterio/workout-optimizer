import React from "react";
import { Row, Input, Button, Table } from "components";

// ---------------------- Component ------------------------

export const DetailsSection = ({ field, isFuture, details, setDetails }) => {
	// Convert program field labels into a default newEntry object
	const getDefaultEntry = (field, done) =>
		field.details.reduce((acc, cur) => {
			const { label, defaultVal } = cur;
			acc[label] = label === "done" ? done : defaultVal;
			return acc;
		}, {});

	const addEntry = (e, done) => {
		e.preventDefault();
		setDetails([...details, getDefaultEntry(field, done)]);
	};

	const updateEntry = ({ value, checked, i, label, type }) => {
		const newValue =
			type === "checkbox" ? checked : type === "number" ? Number(value) : value;

		const newDetails = [...details];
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

	// --------------------- View --------------------

	const getRowCells = (entry, i) =>
		field.details.map(({ label, type }) => (
			<Input
				type={type}
				name={label}
				checked={type === "checkbox" ? entry[label] : null}
				value={entry[label]}
				disabled={label === "done" && isFuture}
				handler={(value, { checked }) =>
					updateEntry({ value, checked, i, label, type })
				}
			/>
		));

	const getTableRow = (entry, i) => [
		<Button handler={removeEntry} data={["index", i]} text="-" />,
		...getRowCells(entry, i),
	];

	return (
		<>
			{!!details.length && (
				<Table
					emptyCornerCell
					headCells={field.details.map((detail) => detail.label)}
					bodyRows={details.map((entry, i) => getTableRow(entry, i))}
				/>
			)}

			<Row center>
				<Button text="New plan" handler={(e) => addEntry(e, false)} />
				<Button
					text="New log"
					handler={(e) => addEntry(e, true)}
					disabled={isFuture}
				/>
			</Row>
		</>
	);
};

export default DetailsSection;
