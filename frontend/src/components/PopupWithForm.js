function PopupWithForm({title, name, submitButtonText, children, isOpen, onClose, onSubmit, altClose}){

	return(
		<div className={`popup ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container" onClick={altClose}>
				<form className="popup__form" name={`form-edit-${name}`} onSubmit={onSubmit}>
					<button className="popup__close" aria-label="close" type="reset" onClick={onClose}/>
					<h3 className="popup__title">{title}</h3>
					{children}
					<button className="popup__submit" type="submit">{submitButtonText}</button>
				</form>
			</div>
		</div>
	)
}
export default PopupWithForm