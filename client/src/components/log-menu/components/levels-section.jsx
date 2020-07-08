import React, { useState } from "react";

import { CustomLevelInput, LevelButton, ToggleButton } from ".";

import { Row } from "../../_common";

export const LevelsSection = ({
	field,
	intensity,
	rest,
	updateCustomLevels,
	handleSubmit,
}) => {
	const [customLevels, setCustomLevels] = useState(false);

	const toggleCustomLevels = () => setCustomLevels(!customLevels);

	const isIntensityCurrent = (int) => int === intensity;

	return (
		<Row>
			<ToggleButton handler={toggleCustomLevels}>
				{customLevels ? "Standard" : "Custom"}
			</ToggleButton>

			{customLevels && (
				<>
					<CustomLevelInput
						name="intensity"
						value={intensity}
						handler={updateCustomLevels}
					/>
					<CustomLevelInput
						name="rest"
						value={rest}
						handler={updateCustomLevels}
					/>
				</>
			)}

			{!customLevels &&
				field.levels.map(({ label, intensity, rest }) => (
					<LevelButton
						key={label}
						label={label}
						intensity={intensity}
						rest={rest}
						isActive={isIntensityCurrent(intensity)}
						handleSubmit={handleSubmit}
					/>
				))}
		</Row>
	);
};

export default LevelsSection;
