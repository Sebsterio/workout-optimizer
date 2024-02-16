import React from "react";

import { Stack, TextArea, TextInput } from "components";

export const DescriptionSection = ({ name, description, handleEditName, setDescription }) => (
	<Stack compact>
		<TextInput name="name" label="name" value={name} handler={handleEditName} />
		<TextArea
			name="description"
			label="description"
			value={description}
			handler={setDescription}
			cols={30}
			rows={10}
		/>
	</Stack>
);
