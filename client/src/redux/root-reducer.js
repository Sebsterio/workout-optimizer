import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import logReducer from "./log/log.reducer";
import programReducer from "./program/program.reducer";
import programsReducer from "./programs/programs.reducer";
import modalReducer from "./modal/modal.reducer";
import errorReducer from "./error/error.reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "log", "program"],
};

const programsPersistConfig = {
	key: "programs",
	storage,
	whitelist: ["private"],
};

const rootReducer = combineReducers({
	user: userReducer,
	log: logReducer,
	program: programReducer,
	programs: persistReducer(programsPersistConfig, programsReducer),
	modal: modalReducer,
	error: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
