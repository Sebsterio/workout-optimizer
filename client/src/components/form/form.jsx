import React, { useState } from "react";

// TODO: CSS focuswithin > label: show

const Form = ({ mode, back, login, register }) => {
	const [msg, setMsg] = useState(null); // alert

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (mode === "login") login({ email, password });
		if (mode === "register") register({ name: username, email, password });
	};

	// ---------------------- Render ----------------------

	const input = (type, name, label, value, handler) => (
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

	const usernameInput = input(
		"text",
		"username",
		"Username",
		username,
		setUsername
	);
	const emailInput = input("email", "email", "Email", email, setEmail);

	const makePasswordInput = (label) =>
		input("password", "password", label, password, setPassword);

	const passwordInput = makePasswordInput("Password");
	const oldPasswordInput = makePasswordInput("Old password");

	const newPasswordInput = input(
		"password",
		"new-password",
		"New password",
		newPassword,
		setNewPassword
	);

	const submitButtonLabel =
		mode === "login"
			? "Log in"
			: mode === "register"
			? "Register"
			: mode === "password"
			? "Done"
			: "";

	return (
		<form className="form">
			{mode === "register" && usernameInput}
			{mode !== "password" && emailInput}
			{mode !== "password" && passwordInput}
			{mode === "password" && oldPasswordInput}
			{mode === "password" && newPasswordInput}

			<button className="form__submit-btn" onClick={handleSubmit}>
				{submitButtonLabel}
			</button>

			<button className="form__back-btn" onClick={back}>
				Back
			</button>
		</form>
	);
};

export default Form;
