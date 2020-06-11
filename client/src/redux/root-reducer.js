import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import logReducer from "./log/log.reducer";
import protocolReducer from "./protocol/protocol.reducer";
import modalReducer from "./modal/modal.reducer";

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	whitelist: ["cart"]
// };

const rootReducer = combineReducers({
	user: userReducer,
	log: logReducer,
	protocol: protocolReducer,
	modal: modalReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
