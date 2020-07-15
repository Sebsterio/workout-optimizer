import React, { useState, useEffect } from "react";
import { Page, Menu, Button } from "components";

const OptionsPage = () => {
	const [cacheExists, setCacheExists] = useState(!!localStorage.length);

	const clearCache = () => {
		localStorage.clear();
		setCacheExists(!!localStorage.length);
	};

	return (
		<Page>
			<Menu>
				<Button
					text={cacheExists ? "Clear cache" : "Cache cleared"}
					handler={clearCache}
					disabled={!cacheExists}
				/>
			</Menu>
		</Page>
	);
};

export default OptionsPage;
