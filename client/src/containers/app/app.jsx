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
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	const userIsDefined = isAuthenticated || isIncognito;

	const pages = routes.map((route) => {
		const { path, component } = route;
		return <Route exact path={path} component={component} key={path} />;
	});

	return (
		<div className="app">
			{userIsDefined && <Header routes={routes} />}
			<Alert />
			<main>
				{isLoading ? (
					<Spinner />
				) : userIsDefined ? (
					<Switch>{pages}</Switch>
				) : (
					<AccountPage />
				)}
				<Modal />
			</main>
		</div>
	);
};

export default App;
