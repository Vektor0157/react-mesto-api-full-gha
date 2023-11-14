import {apiSettings} from "./constants.js";

export class Api {
	constructor (options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
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
			headers: this._headers
		})
			.then(this._checkData);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: this._headers
		})
			.then(this._checkData);
	}

	getInitialData() {
		return Promise.all([this.getInitialCards(), this.getUserInfo()]);
	}

	setUserInfo(user) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: user.name,
				about: user.about
			})
		})
			.then(this._checkData);
	}

	addCard(card) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: card.name,
				link: card.link
			})
		})
			.then(this._checkData);
	}

	deleteCard (card) {
		return fetch(`${this._baseUrl}/cards/${card._id}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(this._checkData);
	}

	setLike(card) {
		return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
			method: 'PUT',
			headers: this._headers
		})
			.then(this._checkData);
	}

	deleteLike(card) {
		return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(this._checkData);
	}

	updateAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: link
			})
		})
			.then(this._checkData);
	}

	changeLikeCardStatus(card, likeCardStatus) {
		return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
			method: (likeCardStatus ? "PUT": "DELETE"),
			headers: this._headers,
		})
			.then(this._checkData);
	}
}
const api = new Api(apiSettings);
export default api