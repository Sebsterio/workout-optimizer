import React from "react";
import { Input } from "../../_common/input";

export const CustomLevelInput = (props) => (
	<Input type="number" label={props.name} column narrow {...props} />
);
