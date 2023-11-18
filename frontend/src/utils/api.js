class Api {
	constructor (options) {
		this._baseUrl = options.baseUrl;
	}

	_checkData (res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => this._checkData(res));
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => this._checkData(res));
	}

	setUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
			.then((res) => this._checkData(res));
	}

	addCard({name, link}) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, link })
		})
			.then((res) => this._checkData(res));
	}

	deleteCard (card) {
		return fetch(`${this._baseUrl}/cards/${card._id}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => this._checkData(res));
	}

	setLike(card) {
		return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
			method: 'PUT',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => this._checkData(res));
	}

	deleteLike(card) {
		return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => this._checkData(res));
	}

	updateAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: link
			})
		})
		.then((res) => this._checkData(res));
	}

	changeLikeCardStatus(card, likeCardStatus) {
		return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
			method: (likeCardStatus ? "PUT": "DELETE"),
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => this._checkData(res));
	}
}

const api = new Api({ 
	baseUrl: 'https://api.vektor.nomoredomainsmonster.ru',
});
export default api