import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const initialState = {};

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") middlewares.push(logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
