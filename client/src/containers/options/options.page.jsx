import React, { useState } from "react";
import { Page, Stack, Button } from "components";

const OptionsPage = () => {
	const [cacheExists, setCacheExists] = useState(!!localStorage.length);

	const clearCache = () => {
		localStorage.clear();
		setCacheExists(!!localStorage.length);
	};

	return (
		<Page>
			<Stack>
				<Button
					text={cacheExists ? "Clear cache" : "Cache cleared"}
					handler={clearCache}
					disabled={!cacheExists}
				/>
			</Stack>
		</Page>
	);
};

export default OptionsPage;
