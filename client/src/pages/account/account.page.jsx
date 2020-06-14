import React, { useState } from "react";

import FormContainer from "../../components/form/form.container";

import "./account.scss";

const AccountPage = ({ user, logout, skipAuth }) => {
	const [form, setForm] = useState(null);

	const { isAuthenticated, isLocal } = user;

	// ------------------------- render -------------------------

	const memberView = (
		<>
			<h1 className="account__heading">
				Welcome, {isAuthenticated ? user.data.name : "Guest"}
			</h1>
			<button className="account__btn" onClick={logout}>
				Log out
			</button>
			<button className="account__btn" onClick={() => setForm("password")}>
				Change password
			</button>
		</>
	);

	const guestView = (
		<>
			<button className="account__btn" onClick={() => setForm("login")}>
				Log in
			</button>
			<button className="account__btn" onClick={() => setForm("register")}>
				Create account
			</button>
			<button className="account__btn" onClick={skipAuth} disabled={isLocal}>
				Use offline
			</button>
		</>
	);

	return (
		<div className="page account">
			<div className="account__wrapper">
				{form ? (
					<FormContainer mode={form} back={() => setForm(null)} />
				) : isAuthenticated ? (
					memberView
				) : (
					guestView
				)}
			</div>
		</div>
	);
};

export default AccountPage;
