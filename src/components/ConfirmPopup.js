import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit()
  }

  return (
    <PopupWithForm name="popupConfirm" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} children={
    <button type="submit" className="popup__button popup__button_type_save">Да</button>}
    />);
}
  
export default ConfirmPopup;