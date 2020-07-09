import React, { useState } from "react";

import "./auth-form.scss";

const AuthForm = ({
	mode,
	goBack,
	login,
	register,
	update,
	connect,
	remove,
}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	// ---------------------- Render ----------------------

	const makeInput = (type, name, label, value, handler) => (
		<div className="form__item form__group">
			<label htmlFor={"auth-" + name}>{label}</label>
			<input
				type={type}
				name={name}
				className={"form__input form__input-" + name}
				id={"auth-" + name}
				placeholder={label}
				value={value}
				onChange={(e) => handler(e.target.value)}
			/>
		</div>
	);

	const nameInput = (label) => makeInput("text", "name", label, name, setName);

	const emailInput = (label) =>
		makeInput("email", "email", label, email, setEmail);

	const passwordInput = (label) =>
		makeInput("password", "password", label, password, setPassword);

	const newPasswordInput = makeInput(
		"password",
		"new-password",
		"New password",
		newPassword,
		setNewPassword
	);

	const submitButton = (label, handler) => (
		<button
			className="form__item form__btn--submit"
			onClick={(e) => {
				e.preventDefault();
				handler({ name, email, password, newPassword });
				// if success:
				// goBack();
			}}
		>
			{label}
		</button>
	);

	const formFields = {
		login: (
			<>
				{emailInput("Email")}
				{passwordInput("Password")}
				{submitButton("Login", login)}
			</>
		),
		register: (
			<>
				{nameInput("Name")}
				{emailInput("Email")}
				{passwordInput("Password")}
				{submitButton("Register", register)}
			</>
		),
		update: (
			<>
				<h3>Feature currently unavailable</h3>
				{passwordInput("Old password")}
				{nameInput("New name")}
				{emailInput("New email")}
				{newPasswordInput}
				{submitButton("Done", update)}
			</>
		),
		connect: (
			<>
				<h3>Feature currently unavailable</h3>
				{emailInput("PT email")}
				{submitButton("Done", connect)}
			</>
		),
		remove: (
			<>
				<h3>Caution!</h3>
				<p>
					You're about to permanently remove all your data. This action cannot
					be undone.
				</p>
				{passwordInput("Password")}
				{submitButton("CLOSE ACCOUNT", remove)}
			</>
		),
	};

	return (
		<form className="form">
			{formFields[mode]}
			<button className="form__item form__btn--back" onClick={goBack}>
				Back
			</button>
		</form>
	);
};

export default AuthForm;
