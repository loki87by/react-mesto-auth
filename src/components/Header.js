/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import logo from '../images/mesto.png';
//import pageText from './Register'
import { Link, useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    props.setLoggedIn(false)
    history.push('/signin');
  }
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <div className="header__info">
        {props.loggedIn ? <p className="header__text">{props.userData.email}</p> : <Link to={props.crossLink} className="header__text">{props.linkText}</Link>}
        {props.loggedIn ? <button onClick={signOut} className="header__text">Выйти</button> : ""}
      </div>
    </header>
  );
}
  
export default Header;