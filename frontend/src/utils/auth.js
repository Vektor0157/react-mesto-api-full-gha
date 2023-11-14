class Auth {
	constructor({ url }) {
		this._url = url;
	}

	_checkData (res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	register(email, password) {
		return fetch(`${this._url}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
		.then(this._checkData);
	}

	login(email, password) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		}).then(this._checkData);
	}

	getContent(token) {
		return fetch(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				"Accept": 'application/json',
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then(this._checkData);
	}
}

const auth = new Auth({
	url: "https://auth.nomoreparties.co"
});

export default auth;