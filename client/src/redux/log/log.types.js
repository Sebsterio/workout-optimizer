export const logActionTypes = {
	// Create remote
	CREATING_REMOTE_LOG: "CREATING_REMOTE_LOG",
	REMOTE_LOG_CREATED: "REMOTE_LOG_CREATED",
	CREATE_REMOTE_LOG_FAIL: "CREATE_REMOTE_LOG_FAIL",

	// Sync
	SYNCING_LOG: "SYNCING_LOG",
	LOG_SYNCED: "LOG_SYNCED",
	LOG_UP_TO_DATE: "LOG_UP_TO_DATE",
	SYNC_LOG_FAIL: "SYNC_LOG_FAIL",

	// Update remote
	UPDATING_REMOTE_LOG: "UPDATING_REMOTE_LOG",
	REMOTE_LOG_UPDATED: "REMOTE_LOG_UPDATED",
	UPDATE_REMOTE_LOG_FAIL: "UPDATE_REMOTE_LOG_FAIL",

	// local log
	UPDATE_LOCAL_LOG_ENTRIES: "UPDATE_LOCAL_LOG_ENTRIES",
	CLEAR_LOCAL_LOG: "CLEAR_LOCAL_LOG",
};
