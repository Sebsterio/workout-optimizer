import React, { useState } from "react";
import { Row } from "components";
import { CustomLevelInput, LevelButton, ToggleButton } from ".";

export const LevelsSection = ({
	field,
	intensity,
	rest,
	setIntensity,
	setRest,
	handleSubmit,
}) => {
	const [customLevels, setCustomLevels] = useState(false);

	const toggleCustomLevels = () => setCustomLevels(!customLevels);

	const isIntensityCurrent = (int) => int === intensity;

	return (
		<Row>
			<ToggleButton
				text={customLevels ? "Standard" : "Custom"}
				handler={toggleCustomLevels}
			/>

			{customLevels && (
				<>
					<CustomLevelInput
						name="intensity"
						value={intensity}
						handler={(val) => setIntensity(Number(val))}
					/>
					<CustomLevelInput
						name="rest"
						value={rest}
						handler={(val) => setRest(Number(val))}
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
