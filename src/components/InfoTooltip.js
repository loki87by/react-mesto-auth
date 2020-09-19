import React from 'react';
import PopupWithForm from './PopupWithForm';
/*
import accesPic from '../images/resOk.svg';
import errorPic from '../images/false.svg';
*/
function InfoTooltip(props) {
  //const data = props.infoData
/*  function failed() {
    setInfoData({text: "Что-то пошло не так! Попробуйте еще раз.", image: errorPic})}
  function passed() {
    setInfoData({text: "Вы успешно зарегистрировались!", image: accesPic})}*/

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