import React from "react";
import { TextArea } from "components";

export const DescriptionSection = ({ description, setDescription }) => (
	<TextArea
		name="description"
		value={description}
		handler={setDescription}
		cols={30}
		rows={10}
	/>
);
