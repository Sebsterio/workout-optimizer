import "./color-picker.scss";

import React from "react";

export const ColorPicker = ({ items, getIsSelected, selectBg }) => {
	return (
		<ul className="color-picker">
			{items.map(({ name, color, gradient }, i) => (
				<li key={i} title={name}>
					<label
						className="color-picker__item"
						style={{
							backgroundColor: color,
							backgroundImage: gradient,
						}}
					>
						<input
							className="sr-only"
							type="radio"
							name="colors"
							value={i}
							checked={getIsSelected(i)}
							onChange={selectBg}
						/>
						<span className="sr-only">{name}</span>
					</label>
				</li>
			))}
		</ul>
	);
};

export default ColorPicker;
