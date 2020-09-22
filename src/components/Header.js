/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import logo from '../images/mesto.png';
import menu from '../images/mob_menu.png';
import { Link } from 'react-router-dom';

function Header(props) {
  function changeLink() {
    if (props.crossLink === "/signin") {
      props.setEnterLink()
    } else {
      props.setRegLink()
    }
  }
  const mobileButton = (
      <>
        {props.isMenuOpen ? <button type="reset" aria-label="Закрыть" onClick={props.closeMenu} id="closeMenu" className="header__close-menu"></button> : <img src={menu} onClick={props.openMenu} className="header__mobile-menu" alt="меню" />}
      </>)
  
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      {props.loggedIn ? mobileButton : <Link to={props.crossLink} onClick={changeLink} className="header__text header__text_doubler">{props.linkText}</Link>}
      <div className="header__info">
        {props.loggedIn ? <p className="header__text">{props.email}</p> : <Link to={props.crossLink} onClick={changeLink} className="header__text">{props.linkText}</Link>}
        {props.loggedIn ? <button onClick={props.signOut} className="header__button">Выйти</button> : ""}
      </div>
    </header>
  );
}
  
export default Header;