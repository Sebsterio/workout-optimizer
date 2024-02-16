import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

import { store, persistor } from "redux/store";
import { ThemeProvider } from 'theme';
import AppContainer from "containers/app";

// import * as serviceWorker from "./serviceWorker";

import "style/global/index.scss";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeProvider>
					<BrowserRouter>
						<AppContainer />
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// serviceWorker.unregister();
