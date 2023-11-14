import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar({isOpen, onClose, altClose, onUpdateAvatar}){
	const [link, setLink] = React.useState('');
	React.useEffect(() => {
		setLink('')
	}, [isOpen]);
	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateAvatar({avatar: link});
	}
	function handleChangeAvatar(evt) {
		setLink(evt.target.value);
	}
	function handleInputSelect(evt){
		evt.target.select()
	}
	return(
		<PopupWithForm title="Обновить аватар" name="avatar" submitButtonText="Сохранить" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} altClose={altClose}>
			<section className="popup__block-input">
				<input className="popup__input popup__input_item_avatar" type="url" placeholder="Ссылка на картинку" name="link" value={link} onChange={handleChangeAvatar} onFocus={handleInputSelect} required/>
				<span className="popup__input-error"/>
			</section>
		</PopupWithForm>
	)
}
export default PopupEditAvatar