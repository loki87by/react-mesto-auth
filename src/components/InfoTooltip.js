import React from 'react';
import PopupWithForm from './PopupWithForm';
import errorPic from '../images/false.svg';

function InfoTooltip(props) {
  
  return (
    <PopupWithForm name="infoTooltip" title="" submitText="" isOpen={props.isOpen} onClose={props.onClose} children={
      <>
        <img src={errorPic} class="popup__result" alt="" />
        <h1 class="popup__caption">Что-то пошло не так! Попробуйте еще раз.</h1>
      </>}
    />
  );
}
  
export default InfoTooltip;