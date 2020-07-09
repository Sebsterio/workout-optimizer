import React from "react";
import { Page, Menu, Button } from "components";

const clearCache = () => localStorage.clear();

const OptionsPage = () => {
	return (
		<Page>
			<Menu>
				<Button text="Clear Cache" handler={clearCache} />
			</Menu>
		</Page>
	);
};

export default OptionsPage;
