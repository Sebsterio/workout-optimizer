import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/header/header";
import AccountPageContainer from "../pages/account/account.container";

import routes from "./routes";

import "./app.scss";

const App = ({ isAuthenticated, isIncognito, loadUser }) => {
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	const userIsDefined = isAuthenticated || isIncognito;
	if (!userIsDefined) return <AccountPageContainer />;

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
