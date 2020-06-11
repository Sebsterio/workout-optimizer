import { createSelector } from "reselect";

const selectProtocol = (state) => state.protocol;

export const selectAreas = createSelector(
	[selectProtocol],
	(protocol) => protocol.areas
);
