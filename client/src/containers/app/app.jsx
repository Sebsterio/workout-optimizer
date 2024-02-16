import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "components/header";
import Spinner from "components/spinner";
import AccountPage from "containers/account";
import Alert from "containers/alert";
import Modal from "containers/modal";
import routes from "routes";
import { useThemeContext } from "theme";

import "./app.scss";

const App = ({ isAuthenticated, isIncognito, isLoading, loadUser }) => {
	const { cssVars } = useThemeContext();

	useEffect(loadUser, [loadUser]);

	const userIsDefined = isAuthenticated || isIncognito;

	const pages = routes.map((route) => {
		const { path, component } = route;
		return <Route exact path={path} component={component} key={path} />;
	});

	return (
		<div className="app" style={cssVars}>
			{userIsDefined && <Header routes={routes} />}
			<Alert />
			<main>
				{isLoading ? <Spinner /> : userIsDefined ? <Switch>{pages}</Switch> : <AccountPage />}
				<Modal />
			</main>
		</div>
	);
};

export default App;
