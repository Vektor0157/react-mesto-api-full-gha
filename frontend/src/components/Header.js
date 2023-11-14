import headerLogo from '../images/logo.svg'
import { Link } from "react-router-dom";
import React from "react";

function Header({ link, email, headingLink, handleLogOut}){
	const [isOpenBurger, setOpenBurger] = React.useState(false);

	function handleBurgerOpen(){
		setOpenBurger(true)
	}

	function handleBurgerClose(){
		setOpenBurger(false)
	}

	return(
		<header className="header">
			<div className={`header__burger-menu ${isOpenBurger ? "header__burger-menu_active" : ""}`}>
				{email && <p className="header__email">{email}</p>}
				<Link to={link} className="header__button-link" onClick={handleLogOut}>{headingLink}</Link>
			</div>
			<div className="header__wrapper">
				<img src={headerLogo} alt="Логотип" className="header__logo"/>
				<div className="header__menu">
					{email && <p className="header__email">{email}</p>}
					<Link to={link} className="header__button-link" onClick={handleLogOut}>{headingLink}</Link>
				</div>
				<div className="header__burger">
					<button className={`header__burger-btn ${isOpenBurger ? '' : 'header__burger-btn_active'}`}onClick={handleBurgerOpen}/>
					<button className={`header__close-btn ${isOpenBurger ? 'header__close-btn_active' : ''}`}onClick={handleBurgerClose}/>
				</div>
			</div>
		</header>
	);
}
export default Header