import React from "react";

import { TextArea } from "../../_common";

export const DescriptionSection = ({ description, setDescription }) => (
	<TextArea
		name="description"
		value={description}
		handler={(e) => setDescription(e.target.value)}
		cols={30}
		rows={10}
	/>
);
