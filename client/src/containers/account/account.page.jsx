import React, { useState } from "react";
import { Page, Menu, Heading, Button } from "components";
import AuthForm from "./components/auth-form";

const AccountPage = ({ user, logout, skipAuth, clearError }) => {
	const [form, setForm] = useState(null);

	const openForm = (mode) => {
		clearError();
		setForm(mode);
	};

	const closeForm = () => {
		clearError();
		setForm(null);
	};

	const { isAuthenticated, isLocal } = user;

	const welcomeMsg = `Welcome${user && `, ${user.name}`}`;

	return (
		<Page>
			{form ? (
				<AuthForm mode={form} goBack={closeForm} />
			) : isAuthenticated ? (
				<Menu compact>
					<Heading text={welcomeMsg} />
					<Button text="Log out" handler={logout} />
					<Button text="Connect with PT" handler={() => openForm("connect")} />
					<Button text="Manage account" handler={() => openForm("update")} />
					<Button text="Delete account" handler={() => openForm("remove")} />
				</Menu>
			) : (
				<Menu compact>
					<Button text="Log in" handler={() => openForm("login")} />
					<Button text="Create account" handler={() => openForm("register")} />
					<Button text="Use offline" handler={skipAuth} disabled={isLocal} />
				</Menu>
			)}
		</Page>
	);
};

export default AccountPage;
