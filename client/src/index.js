import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";
import AppContainer from "./app/app.container";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<AppContainer />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
