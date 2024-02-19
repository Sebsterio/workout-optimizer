import React from "react";

import { Picker } from "components/picker";

export const ColorPicker = ({ items, selectedId, onSelect: handleSelect }) => {
	return (
		<Picker selectedId={selectedId} onSelect={handleSelect}>
			{items.map((data, i) => (
				<Picker.Item {...data} key={i} />
			))}
		</Picker>
	);
};
