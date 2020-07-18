import React from "react";
import { Input } from "components";

export const CustomLevelInput = (props) => (
	<Input type="number" label={props.name} column narrow {...props} />
);
