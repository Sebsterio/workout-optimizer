import React, { useState } from "react";
import { Menu, Button, Input, Heading, Text } from "components";

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

	const nameInput = (label) => (
		<Input
			type="text"
			name="name"
			label={label}
			value={name}
			handler={setName}
		/>
	);

	const emailInput = (label) => (
		<Input
			type="email"
			name="email"
			label={label}
			value={email}
			handler={setEmail}
		/>
	);

	const passwordInput = (label) => (
		<Input
			type="password"
			name="password"
			label={label}
			value={password}
			handler={setPassword}
		/>
	);

	const newPasswordInput = (
		<Input
			type="password"
			name="new-password"
			label="New password"
			value={newPassword}
			handler={setNewPassword}
		/>
	);

	const submitButton = (label, handler) => (
		<Button
			text={label}
			handler={() => handler({ name, email, password, newPassword })}
		/>
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
				<Heading small text="Feature currently unavailable" />
				{passwordInput("Old password")}
				{nameInput("New name")}
				{emailInput("New email")}
				{newPasswordInput}
				{submitButton("Done", update)}
			</>
		),
		connect: (
			<>
				{/* My PTs: (component consiting of blocks - 1 for each connected PT) */}
				<Heading small text="Feature currently unavailable" />
				<Text>
					By connecting with a PT, you authrize him/her to view and modify your
					protocol and exercise log.
				</Text>
				{emailInput("PT email")}
				{passwordInput("Your password")}
				{submitButton("Connect", connect)}
			</>
		),
		remove: (
			<>
				<Heading small text="Caution!" />
				<Text>
					You're about to permanently remove all your data. This action cannot
					be undone.
				</Text>
				{passwordInput("Password")}
				{submitButton("CLOSE ACCOUNT", remove)}
			</>
		),
	};

	return (
		<Menu compact>
			{formFields[mode]}
			<Button text="Back" handler={goBack} />
		</Menu>
	);
};

export default AuthForm;
