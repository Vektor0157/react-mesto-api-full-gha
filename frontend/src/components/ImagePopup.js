function ImagePopup({ card, onClose, altClose }){
	return(
		<div className={`popup popup_type_photo ${card.link ? "popup_opened" : ""}`}>
			<div className="popup__container popup__container_photo" onClick={altClose}>
				<figure className="popup__photo-card" >
					<button className="popup__close popup__close_photo" aria-label="Закрыть фотографию" type="reset" onClick={onClose}/>
					<img src={`${card.link}`} alt={card.name}  className="popup__image"/>
					<h3 className="popup__name">{card.name} </h3>
				</figure>
			</div>
		</div>
	)
}

export default ImagePopup