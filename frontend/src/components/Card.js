import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}){
	const currentUser = React.useContext(CurrentUserContext)	
	const isOwn = card.owner._id === currentUser._id;
	const cardDeleteButtonClassName =  `element__delete ${!isOwn ? 'element__delete_hidden': ''}`
	const isLiked = card.likes.some((i) => i._id === currentUser._id);
	const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active': ''}`
	function handleClick(){
		onCardClick(card);
	}
	function handleLikeClick() {
		onCardLike(card);
	}
	function handleDeleteClick() {
		onCardDelete(card);
	}
	return(
		<div className="element">
			<img src={`${card.link}`} alt={card.name} className="element__photo" onClick={handleClick}/>
			<div className="element__container">
				<h2 className="element__title">{card.name}</h2>
				<button className={cardLikeButtonClassName} aria-label="Поставить лайк" type="button" onClick={handleLikeClick}>
					<span className="element__calculator">{card.likes.length}</span>
				</button>
			</div>
			<button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={() => handleDeleteClick()}>
</button>
		</div>
	)
}
export default Card