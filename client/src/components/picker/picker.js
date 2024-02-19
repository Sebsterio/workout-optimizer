import React from "react";

import "./picker.scss";

export const PickerItem = ({ id, name, fallback, background, selected, onSelect }) => {
	return (
		<li title={name}>
			<label
				className="picker__item"
				style={{
					backgroundColor: fallback,
					backgroundImage: background,
				}}
			>
				<input
					className="sr-only"
					type="radio"
					name="colors"
					value={id}
					checked={selected}
					onChange={onSelect}
				/>
				<span className="sr-only">{name}</span>
			</label>
		</li>
	);
};

export const Picker = ({ children, selectedId, onSelect: handleSelect }) => {
	// internal state, e.g. hover effects ...
	return (
		<ul className="picker">
			{React.Children.map(children, (child) =>
				React.cloneElement(child, {
					selected: child.props.id === selectedId,
					onSelect: () => handleSelect(child.props.id),
				})
			)}
		</ul>
	);
};
