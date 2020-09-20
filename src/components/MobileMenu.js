import React from 'react';

function MobileMenu(props) {
  function signOut() {
    props.closeMenu()
    props.signOut()
  }
  return(
    <div className={`mobile-menu ${props.isOpen && "mobile-menu_opened"}`}>
      <p className="mobile-menu__text">{props.userData.email}</p>
      <button onClick={signOut} type="reset" className="mobile-menu__button">Выйти</button>
    </div>
  )
}
  
export default MobileMenu;