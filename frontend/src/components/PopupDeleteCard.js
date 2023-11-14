import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function PopupDeleteCard({isOpen, onClose, altClose ,card, onSubmitDelete}){
	function handleSubmit(evt) {
		evt.preventDefault();
		onSubmitDelete(card);
	}
	return(
		<PopupWithForm submitButtonText="Да" title='Вы уверены?' name='remove' isOpen={isOpen} onClose={onClose} altClose={altClose} onSubmit={handleSubmit}/>
	)
}
export default PopupDeleteCard