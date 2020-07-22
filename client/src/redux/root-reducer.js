import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import logReducer from "./log/log.reducer";
import programsReducer from "./programs/programs.reducer";
import programsListReducer from "./programs-list/programs-list.reducer";
import modalReducer from "./modal/modal.reducer";
import errorReducer from "./error/error.reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "log", "programsList"],
};

const programsPersistConfig = {
	key: "programs",
	storage,
	blacklist: ["fetched"],
};

const rootReducer = combineReducers({
	user: userReducer,
	log: logReducer,
	programs: persistReducer(programsPersistConfig, programsReducer),
	programsList: programsListReducer,
	modal: modalReducer,
	error: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
