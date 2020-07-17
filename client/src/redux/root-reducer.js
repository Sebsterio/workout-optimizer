import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import logReducer from "./log/log.reducer";
import programReducer from "./program/program.reducer";
import programsReducer from "./programs/programs.reducer";
import programsListReducer from "./programs-list/programs-list.reducer";
import modalReducer from "./modal/modal.reducer";
import errorReducer from "./error/error.reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "log", "program", "programsList"],
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
	programsList: programsListReducer,
	modal: modalReducer,
	error: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
