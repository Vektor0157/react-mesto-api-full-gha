import React, { useState } from "react";

function Login({ handleLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(email, password);
	};

	return (
		<div className="auth">
			<h2 className="auth__title">Вход</h2>
			<form onSubmit={handleSubmit} className="auth__form">
				<input required className="auth__input" type="email" placeholder="Введите адрес почты" value={email} onChange={handleChangeEmail}/>
				<input required className="auth__input" type="password" placeholder="Введите пароль" value={password} onChange={handleChangePassword}/>
				<button type="submit" className="auth__submit">Войти</button>
			</form>
		</div>
	);
}

export default Login;