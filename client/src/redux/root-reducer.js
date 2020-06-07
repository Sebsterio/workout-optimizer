import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import trackerReducer from "./tracker/tracker.reducer";

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	whitelist: ["cart"]
// };

const rootReducer = combineReducers({
	user: userReducer,
	tracker: trackerReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
