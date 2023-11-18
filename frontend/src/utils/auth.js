export const BASE_URL = "https://api.vektor.nomoredomainsmonster.ru"

const checkData = (res) => {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
}

export const register = (email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
	.then(checkData);
}

export const login = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email,password }),
	})
	.then(checkData)
}

export const getContent = (jwt) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Accept": 'application/json',
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	}).then(checkData);
}