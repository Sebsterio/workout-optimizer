import React, { useState } from "react";

// TODO: CSS focuswithin > label: show

const Form = ({ mode, goBack, login, register, update }) => {
	// const [msg, setMsg] = useState(null); // alert

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	// ---------------------- Render ----------------------

	const makeInput = (type, name, label, value, handler) => (
		<div className="form-group">
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

	const makeNameInput = (label) =>
		makeInput("text", "name", label, name, setName);
	const nameInput = makeNameInput("Name");
	const newNameInput = makeNameInput("New name");

	const makeEmailInput = (label) =>
		makeInput("email", "email", label, email, setEmail);
	const emailInput = makeEmailInput("Email");
	const newEmailInput = makeEmailInput("New email");

	const makePasswordInput = (label) =>
		makeInput("password", "password", label, password, setPassword);
	const passwordInput = makePasswordInput("Password");
	const oldPasswordInput = makePasswordInput("Old password");
	const newPasswordInput = makeInput(
		"password",
		"new-password",
		"New password",
		newPassword,
		setNewPassword
	);

	const makeSubmitButton = (label, handler) => (
		<button
			className="form__submit-btn"
			onClick={(e) => {
				e.preventDefault();
				handler({ name, email, password });
			}}
		>
			{label}
		</button>
	);
	const loginButton = makeSubmitButton("Login", login);
	const registerButton = makeSubmitButton("Register", register);
	const doneButton = makeSubmitButton("Done", update);

	const formFields = {
		login: (
			<>
				{emailInput}
				{passwordInput}
				{loginButton}
			</>
		),
		register: (
			<>
				{nameInput}
				{emailInput}
				{passwordInput}
				{registerButton}
			</>
		),
		update: (
			<>
				{oldPasswordInput}
				{newNameInput}
				{newEmailInput}
				{newPasswordInput}
				{doneButton}
			</>
		),
	};

	return (
		<form className="form">
			{formFields[mode]}
			<button className="form__back-btn" onClick={goBack}>
				Back
			</button>
		</form>
	);
};

export default Form;
