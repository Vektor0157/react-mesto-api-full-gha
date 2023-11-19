import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupEditProfile from "./PopupEditProfile";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupAddCard from "./PopupAddCard";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupDeleteCard from "./PopupDeleteCard";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import ToolTip from "./ToolTip";

function App() {
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
	const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
	const [isDeletePopup, setDeletePopup] = useState(false);
	const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
	const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [cardToDelete, setCardToDelete] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		loggedIn &&
		Promise.all([api.getUserInfo(), api.getInitialCards()])
			.then(([userData, cards]) => {
				setCurrentUser(userData);
				setCards(cards.data);
			})
			.catch((err) => console.log(err));
		сheckTocken(); 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn]);

	function handleLogin(email, password) {
		auth.login(email, password)
		.then((res) => {
			localStorage.setItem("jwt", res.token);
			setLoggedIn(true);
			setEmail(email);
			navigate("/", { replace: true });
		})
		.catch((err) => {
			console.log(err);
		});
	}

	function handleLogOut() {
		setLoggedIn(false);
		localStorage.removeItem("jwt");
		navigate("/sign-in", { replace: true });
	}

	function handleRegister(email, password) {
		auth.register(email, password)
		.then(() => {
			setEmail(email);
			setIsTooltipSuccess(true);
			setIsTooltipPopupOpen(true);
			navigate("/sign-in", { replace: true });
		})
		.catch(() => {
			setIsTooltipSuccess(false);
			setIsTooltipPopupOpen(true);
		});
	}

	function сheckTocken() { 
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			auth
			.getContent(jwt)
			.then((res) => {
				if (res) {
				setLoggedIn(true);
				navigate('/', { replace: true });
				setEmail(res.email);
				setCurrentUser(res);
				}
			})
			.catch((err) => {
			console.error(err);
			});
		}
	}

	function handleUpdateUser(user){
		api.setUserInfo(user)
		.then((update) =>{
			setCurrentUser({
				...currentUser,
				name: update.name,
				about: update.about,
			})
			closeAllPopups()
		})
		.catch((err) => console.log(err))
	}

	function handleUpdateAvatar({avatar}){
		api.updateAvatar(avatar)
			.then((data) =>{
				setCurrentUser(data)
				closeAllPopups()
			})
			.catch((err) => console.log(err))
	}
	
	function handleAddCard({name, link}){
		api.addCard({name, link})
			.then((update)=>{
				setCards([update.data, ...cards])
				closeAllPopups()
			})
			.catch((err)=>{console.log(err)})
	}

	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}

	function handleAddCardClick() {
		setAddCardPopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleDeleteClick(card) {
		setDeletePopup(true);
		setCardToDelete(card);
	}

	function closeAllPopups() {
		setEditAvatarPopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddCardPopupOpen(false);
		setDeletePopup(false);
		setSelectedCard(null);
		setCardToDelete(null);
		setIsTooltipPopupOpen(false);
	}

	function closeContainer(evt) {
		if (evt.target === evt.currentTarget) {
			closeAllPopups();
		}
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((user) => user === currentUser._id);
		(isLiked ? api.deleteLike(card._id) : api.setLike(card._id, true))
		.then((newCard) => {
			if (newCard && newCard._id) {
			setCards((state) =>
				state.map((c) => (c._id === newCard._id ? newCard : c))
			);
			} else {
				console.error('Неправильный формат ответа от API', newCard);
			}
		})
		.catch((err) => console.log(err));
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards(cards.filter((state) => state._id !== card._id));
				closeAllPopups()
			})
			.catch((err)=> console.log(err))
	}

	useEffect(() => {
		function handleEscClose(evt) {
		if (evt.key === 'Escape') {
				closeAllPopups();
			}
		}
		document.addEventListener('keyup', handleEscClose);
		return () => {
			document.removeEventListener('keyup', handleEscClose);
		};
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					{loggedIn ? (
					<Route path="*" element={<Navigate to="/" />} />
					) : (
					<Route path="*" element={<Navigate to="/sign-in" replace />} />
					)}
					<Route path="/sign-in"
						element={
						<>
							<Header headingLink="Регистрация" link="/sign-up" />
							<Login handleLogin={handleLogin} />
						</>
						}
					/>
					<Route path="/sign-up"
						element={
						<>
							<Header text="Войти" link="/sign-in" />
							<Register handleRegister={handleRegister} />
						</>
						}
					/>
					<Route path="/"
						element={
						<>
							<Header headingLink="Выйти" link="/sign-in" email={email} handleLogOut={handleLogOut}/>
							<ProtectedRouteElement element={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddCard={handleAddCardClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteClick}/>
							<Footer />
						</>
						}
					/>
				</Routes>
				<PopupEditProfile isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
				<PopupEditAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
				<PopupAddCard isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
				{selectedCard && (
					<ImagePopup card={selectedCard} onClose={closeAllPopups} onClick={closeContainer}/>
				)}
				{cardToDelete && (
					<PopupDeleteCard isOpen={isDeletePopup} onClose={closeAllPopups} card={cardToDelete} onSubmitDelete={handleCardDelete}/>
				)}
				<ToolTip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isTooltipSuccess} isToolTipForm={true}/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;