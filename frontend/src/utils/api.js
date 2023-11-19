class Api {
	constructor (config) {
		this._baseUrl = config.baseUrl;
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
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => this._checkData(res));
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => this._checkData(res));
	}

	setUserInfo(user) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: user.name,
				about: user.about
			})
		})
			.then((res) => this._checkData(res));
	}

	addCard({name, link}) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, link })
		})
			.then((res) => this._checkData(res));
	}

	deleteCard(cardId) { 
		return fetch(`${this._baseUrl}/cards/${cardId}`, { 
		method: "DELETE", 
		headers: {
			'authorization': `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json'
		}
		})
		.then((res) => this._checkData(res));
	}

	setLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
		method: "PUT",
		headers: {
			'authorization': `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json'
		}
		})
		.then((res) => this._checkData(res));
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
		method: "DELETE",
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
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: link.avatar
			})
		})
		.then((res) => this._checkData(res));
	}

	/*changeLikeCardStatus(cardId, isLiked) {
		if (isLiked) {
			return this.deleteLike(cardId)
		} else {
			return this.setLike(cardId)
		}
	}*/
}

const api = new Api({ 
	baseUrl: 'https://api.vektor.nomoredomainsmonster.ru',
});
export default api