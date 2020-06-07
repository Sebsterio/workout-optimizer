import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import AppContainer from "./components/app/app.container";

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
