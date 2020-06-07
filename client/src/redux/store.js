import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const initialState = {};

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") middlewares.push(logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
