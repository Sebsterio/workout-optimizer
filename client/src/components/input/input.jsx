import React from "react";
import shortid from "shortid";
import "./input.scss";

export const Input = (props) => {
	const { type, label, handler, options, data, column, narrow } = props;

	// Input element attributes
	const attributes = {
		className: "input__input",
		onChange: (e) => handler(e.target.value, e.target),
	};

	// Add attribute if passed as prop and condition is met
	const addAttrFromProps = (attrName, condition = true, modifier) => {
		const attrVal = props[attrName];
		if (attrVal === undefined || !condition) return;
		attributes[attrName] = modifier ? modifier(attrVal) : attrVal;
	};

	addAttrFromProps("name");
	addAttrFromProps("value");
	addAttrFromProps("min");
	addAttrFromProps("max");
	addAttrFromProps("placeholder");
	addAttrFromProps("checked", type === "checkbox");
	addAttrFromProps("type", type !== "textarea");
	addAttrFromProps("cols", type === "textarea", String);
	addAttrFromProps("rows", type === "textarea", String);

	if (label) attributes.id = shortid.generate();
	if (data) attributes[`data-${data[0]}`] = data[1];

	// Container className
	let classes = `input input--${type}`;
	if (column) classes += " input--column";
	if (narrow) classes += " input--narrow";

	return (
		<div className={classes}>
			{label && (
				<label className="input__label" htmlFor={attributes.id}>
					{label}
				</label>
			)}
			{type === "textarea" ? (
				<textarea {...attributes}></textarea>
			) : type === "select" ? (
				<select {...attributes}>
					{options &&
						options.map((opt) => (
							<option value={opt[0]} key={opt[0]}>
								{opt[1]}
							</option>
						))}
				</select>
			) : (
				<input {...attributes} />
			)}
		</div>
	);
};

export const TextInput = (props) => <Input type="text" {...props} />;

export const TextArea = (props) => <Input type="textarea" {...props} />;
