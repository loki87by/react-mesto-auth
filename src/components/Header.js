/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import logo from '../images/mesto.png';
//import pageText from './Register'
import { useHistory } from 'react-router-dom';

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
        <p className="header__text">{props.loggedIn ? props.userData.email : ""}</p>
        {props.loggedIn ? <button onClick={signOut} className="header__text">Выйти</button> : ""}
      </div>
    </header>
  );
}
  
export default Header;