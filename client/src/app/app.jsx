import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/header/header";

import routes from "./routes";

import "./app.scss";

const App = ({ currentUser, hideCart, checkUserSession }) => {
	// useEffect(() => {
	// 	checkUserSession();
	// }, [checkUserSession]);

	// useEffect(() => {
	// 	// selectCartHidden buggy with event listener (?)
	// 	document.addEventListener("click", (e) => {
	// 		if (!e.target.closest(".ignore-click-listener")) hideCart();
	// 	});
	// }, [hideCart]);

	const pages = routes.map((route) => {
		const { path, component } = route;
		return <Route exact path={path} component={component} key={path} />;
	});

	return (
		<div className="app">
			<Header />
			<main>
				<Switch>{pages}</Switch>
			</main>
		</div>
	);
};

export default App;
