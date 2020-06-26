import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import logReducer from "./log/log.reducer";
import protocolReducer from "./protocol/protocol.reducer";
import modalReducer from "./modal/modal.reducer";
import errorReducer from "./error/error.reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "log", "protocol"],
};

const rootReducer = combineReducers({
	user: userReducer,
	log: logReducer,
	protocol: protocolReducer,
	modal: modalReducer,
	error: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
