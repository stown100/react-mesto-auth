import React from 'react';
import closePopupImg from '../images/CloseIcon.svg';

const NavBarMenu = ({ isOpen, setBurgerMenu, userData, onSignOut, closeAllPopups }) => {
    return (
            <div className="navbar__menu">
                <button className={`navbar__button-menu ${isOpen && "navbar__button-menu_open"}`} onClick={() => setBurgerMenu(true)}>
                    <span></span>
                </button>
                <ul className={`navbar__nav  ${isOpen && "navbar__nav_open"}`}>
                    <li className="navbar__link">{userData.email}</li>
                    <li><button onClick={onSignOut} className="navbar__link navbar__button">Выйти</button></li>
                </ul>
                <button type="button" className={`popup__close popup__close_invisible ${isOpen && "popup__close_visible"}`} onClick={closeAllPopups}>
                    <img src={closePopupImg} alt="Крестик" />
                </button>
            </div>
    )
}

export default NavBarMenu;