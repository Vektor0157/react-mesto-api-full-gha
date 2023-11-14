import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({isOpen, onClose, altClose ,onAddCard}){
	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');
	React.useEffect(()=>{
		setName('');
		setLink('');
	}, [isOpen])

	function handleAddCardSubmit(evt) {
		evt.preventDefault();
		onAddCard({ name, link });
	}

	function handleChangeTitle(evt) {
		setName(evt.target.value);
	}

	function handleChangeLink(evt) {
		setLink(evt.target.value);
	}

	function handleInputSelect(evt){
		evt.target.select()
	}
	return(
		<PopupWithForm title="Новое место" name="card" submitButtonText="Создать" isOpen={isOpen} onClose={onClose} altClose={altClose} onSubmit={handleAddCardSubmit}>
			<section className="popup__block-input">
				<input className="popup__input popup__input_type_name" type="text" placeholder="Название" name="name" value={name} minLength="2" maxLength="40" onChange={handleChangeTitle} onFocus={handleInputSelect} required/>
				<span className="popup__input-error"/>
			</section>
			<section className="popup__block-input">
				<input className="popup__input popup__input_type_profession" type="url" placeholder="Ссылка на картинку" name="about" value={link} minLength="2" maxLength="200" onChange={handleChangeLink} onFocus={handleInputSelect} required/>
				<span className="popup__input-error"/>
			</section>
		</PopupWithForm>
	)
}
export default PopupAddCard