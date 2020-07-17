export const logActionTypes = {
	// local log
	CLEAR_LOCAL_LOG: "CLEAR_LOCAL_LOG",

	// POST log
	CREATING_REMOTE_LOG: "CREATING_REMOTE_LOG",
	REMOTE_LOG_CREATED: "REMOTE_LOG_CREATED",

	// GET log
	SYNCING_LOG: "SYNCING_LOG", // GET
	LOG_UP_TO_DATE: "LOG_UP_TO_DATE",
	LOG_SYNCED: "LOG_SYNCED", // GET

	// POST entry
	UPDATE_LOCAL_LOG_ENTRIES: "UPDATE_LOCAL_LOG_ENTRIES",
	UPDATING_REMOTE_LOG: "UPDATING_REMOTE_LOG",
	REMOTE_LOG_UPDATED: "REMOTE_LOG_UPDATED",
};
