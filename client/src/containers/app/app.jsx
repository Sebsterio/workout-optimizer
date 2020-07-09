import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Alert from "containers/alert";
import Modal from "containers/modal";
import AccountPage from "containers/account";

import Header from "components/header";
import Spinner from "components/spinner";

import routes from "./routes";

import "./app.scss";

const App = ({ isAuthenticated, isIncognito, isLoading, loadUser }) => {
	const userIsDefined = isAuthenticated || isIncognito;

	useEffect(() => {
		loadUser();
	}, [loadUser]);

	const pages = routes.map((route) => {
		const { path, component } = route;
		return <Route exact path={path} component={component} key={path} />;
	});

	return (
		<div className="app">
			{userIsDefined && <Header routes={routes} />}
			<main>
				<Alert />
				{isLoading ? (
					<Spinner />
				) : !userIsDefined ? (
					<AccountPage />
				) : (
					<Switch>{pages}</Switch>
				)}
				<Modal />
			</main>
		</div>
	);
};

export default App;
