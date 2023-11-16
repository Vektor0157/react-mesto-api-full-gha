import React from 'react';
import fail from '../images/authFail.svg'
import OK from '../images/authOk.svg'


function ToolTip({ name, onSubmit, isOpen, isSuccess, onClose, altClose}) {
	const title = isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз.";

	return (
		<div className={`popup ${isOpen ? `popup_opened` : ""}`}>
			<div className="popup__container" onClick={altClose}>
				<div className="popup__form" name={`form-edit-${name}`} onSubmit={onSubmit} noValidate>
					<button className="popup__close" aria-label="close" type="reset" onClick={onClose}/>
					<img className={`${isSuccess ? `popup__auth` : `popup__auth-fail`}`} src={isSuccess ? OK : fail} alt={title}/>
					<h2 className="popup__title-tooltip">{title}</h2>
				</div>
			</div>
		</div>
	);
}

export default ToolTip;