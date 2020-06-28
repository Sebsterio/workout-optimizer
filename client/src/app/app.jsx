import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/header/header";
import AccountPage from "../pages/account/account.container";
import Alert from "../components/alert/alert.container";
import Spinner from "../components/spinner/spinner";
import Modal from "../components/modal/modal.container";

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
			{userIsDefined && <Header />}
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
