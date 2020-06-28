import protocolActionTypes from "./protocol.types";
import { INITIAL_STATE } from "./protocol.initialState";
import {
	getUpdatedState,
	getFieldsWithNewMaxCustomRest,
} from "./protocol.utils";

const {
	UPDATE_MAX_CUSTOM_REST,
	UPDATE_LOCAL_PROTOCOL,
	CREATING_REMOTE_PROTOCOL,
	UPDATING_REMOTE_PROTOCOL,
	SYNCING_PROTOCOL,
	REMOTE_PROTOCOL_CREATED,
	REMOTE_PROTOCOL_UPDATED,
	PROTOCOL_UP_TO_DATE,
	PROTOCOL_SYNCED,
	CLEAR_LOCAL_PROTOCOL,
} = protocolActionTypes;

const protocolReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATING_REMOTE_PROTOCOL:
		case UPDATING_REMOTE_PROTOCOL:
		case SYNCING_PROTOCOL: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}
		case REMOTE_PROTOCOL_CREATED:
		case REMOTE_PROTOCOL_UPDATED:
		case PROTOCOL_UP_TO_DATE: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}
		case PROTOCOL_SYNCED: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}

		case UPDATE_MAX_CUSTOM_REST:
			return {
				...state,
				fields: getFieldsWithNewMaxCustomRest(state, action.payload),
			};

		case UPDATE_LOCAL_PROTOCOL: {
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				...getUpdatedState(state, action.payload),
			};
		}
		case CLEAR_LOCAL_PROTOCOL: {
			return {
				isSyncing: false,
				isSynced: false,
				dateUpdated: null,
				name: "",
				description: "",
				fields: {},
			};
		}
		default:
			return state;
	}
};

export default protocolReducer;
