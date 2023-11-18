import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({card, onEditAvatar, onEditProfile, onAddCard, onCardClick, cards, onCardLike, onCardDelete }){
	const currentUser = React.useContext(CurrentUserContext);
	function handleDeleteClick() {
		onCardDelete(card);
	}
	return(
		<main className="content">
			<section className="profile">
				<div className="profile__place">
					<img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
					<button className="profile__edit-avatar" onClick={onEditAvatar}/>
				</div>
				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<button className="profile__btn" aria-label="Редактирование профиля" type="button" onClick={onEditProfile}/>
					<p className="profile__description">{currentUser.about}</p>
				</div>
				<button className="profile__add-btn" aria-label="Добавить изображения" type="button" onClick={onAddCard}/>
			</section>
			<section className="elements">
			{cards.map((card) => {
					return (
						<Card
							key={card._id}
							card={card}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={() => handleDeleteClick(card)}
						/>
					);
				})}
			</section>
		</main>
	)
}
export default Main