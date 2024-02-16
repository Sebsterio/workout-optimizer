import React, { useState } from "react";

import { Button, ColorPicker, Heading, Menu, Page, Stack } from "components";
import { gradients, useThemeContext } from "theme";

const OptionsPage = () => {
	const { bgName, bgId, setBgId } = useThemeContext();

	const [hasStorage, setHasStorage] = useState(!!localStorage.length);

	const clearStorage = () => {
		localStorage.clear();
		setHasStorage(!!localStorage.length);
	};

	return (
		<Page>
			<Stack>
				<Heading text="Options" />

				<Menu size="m" header={"Theme: " + bgName}>
					<ColorPicker
						items={gradients}
						getIsSelected={(i) => bgId === String(i)}
						selectBg={(e) => setBgId(e.target.value)}
					/>
				</Menu>

				<hr />

				<Button
					text={hasStorage ? "Clear cache" : "Cache cleared"}
					handler={clearStorage}
					disabled={!hasStorage} //
				/>
			</Stack>
		</Page>
	);
};

export default OptionsPage;
