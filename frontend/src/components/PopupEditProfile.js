import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function PopupEditProfile({isOpen, onClose, onUpdateUser, altClose}){
	const [name, setName] = React.useState("name");
	const [description, setDescription] = React.useState("about")
	const currentUser = React.useContext(CurrentUserContext)
	React.useEffect(() => {
		if(currentUser.name && currentUser.about) {
			setName(currentUser.name);
			setDescription(currentUser.about);
		}
	}, [currentUser, isOpen])
	function handleChangeName(evt) {
		setName(evt.target.value);
	}
	function handleChangeAbout(evt) {
		setDescription(evt.target.value);
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateUser({name, about: description})
	}
	function handleInputSelect(evt){
		evt.target.select()
	}
	return(
		<PopupWithForm title='Редактировать профиль' name='profile' submitButtonText='Сохранить' onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} altClose={altClose}>
			<section className="popup__block-input">
				<input className="popup__input popup__input_item_name" type="text" placeholder="Введите ваше имя" name="name" value={name} minLength="2" maxLength="40" onChange={handleChangeName} onFocus={handleInputSelect} required/>
				<span className="popup__input-error"/>
			</section>
			<section className="popup__block-input">
				<input className="popup__input popup__input_item_info" type="text" placeholder="Расскажите о себе" name="about" value={description} minLength="2" maxLength="200" onChange={handleChangeAbout} onFocus={handleInputSelect} required/>
				<span className="popup__input-error"/>
			</section>
		</PopupWithForm>
	)
}
export default PopupEditProfile