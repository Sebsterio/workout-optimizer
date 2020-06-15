import React, { useState } from "react";

import FormContainer from "../../components/form/form.container";

import "./account.scss";

const AccountPage = ({ user, logout, skipAuth, clearError }) => {
	const [form, setForm] = useState(null);

	const openForm = (e) => {
		clearError();
		setForm(e.target.dataset.form);
	};

	const closeForm = () => {
		clearError();
		setForm(null);
	};

	const { isAuthenticated, isLocal } = user;

	const memberView = (
		<>
			<h1 className="account__heading">Welcome, {user && user.name}</h1>
			<button className="account__btn" onClick={logout}>
				Log out
			</button>
			<button className="account__btn" data-form="update" onClick={openForm}>
				Manage account
			</button>
		</>
	);

	const guestView = (
		<>
			<button className="account__btn" data-form="login" onClick={openForm}>
				Log in
			</button>
			<button className="account__btn" data-form="register" onClick={openForm}>
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
					<FormContainer mode={form} goBack={closeForm} />
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
