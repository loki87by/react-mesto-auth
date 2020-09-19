import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip(props) {

  return (
    <PopupWithForm name="infoTooltip" title="" submitText="" isOpen={props.isOpen} onClose={props.onClose} children={
      <>
        <img src={props.image} className="popup__result" alt="" />
        <h1 className="popup__caption">{props.text}</h1>
      </>}
    />
  );
}
  
export default InfoTooltip;