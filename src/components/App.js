﻿import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import * as Auth from '../Auth';
//import Auth from '../Auth';
//import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/Api';
import InfoTooltip from './InfoTooltip';
//import Card from './Card';
import ProtectedRoute from './ProtectedRoute';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import '../index.css';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';


import accesPic from '../images/resOk.svg';
import errorPic from '../images/false.svg';
  


function App() {
  //**стейты
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [dataImage, setDataImage] = React.useState({link: '', name: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSaveLoading, setSaveLoading] = React.useState("Сохранить");
  const [isCreateLoading, setCreateLoading] = React.useState("Создать");
  const [cardDelete, selectCardDelete] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
    _id: ""
  });
  const history = useHistory();

  //**функции
  //*функции открытия попапов
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  };
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };
  function handleCardClick(props) {
    setSelectedCard(true);
    setDataImage(props)
  };
  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  };
  //*функции смены текста сабмита
  function createLoader() {
    setCreateLoading("Создание")
  }
  function saveLoader() {
    setSaveLoading("Сохранение")
  }
  //*функции закрытия попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(false)
    setDataImage({})
    setConfirmPopupOpen(false)
    setInfoTooltipOpen(false)
    setCreateLoading("Создать")
    setSaveLoading("Сохранить")
  }
  function handleEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }
  function handleClickClose(e) {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose)
    window.addEventListener('click', handleClickClose)
  })
  //*функции карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.like(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((i) => i._id === card._id ? newCard : i);
      setCards(newCards);
    });
    api.dislike(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((i) => i._id === card._id ? newCard : i);
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    setConfirmPopupOpen(true)
    selectCardDelete(card)
  }

  function ConfirmDelete() {
    api.deleteCard(cardDelete._id).then(() => {
      const newCards = cards.filter((i) => i._id !== cardDelete._id);
      setCards(newCards);
      closeAllPopups();
    });
  }
  function handleUpdatePlace(data) {
    api.addNewCard(data.name, data.link)
    .then((res) => {
      setDataImage(res);
      setCards([res, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }
  //*дефолтные карточки и пользовательские данные
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  //*функции изменения пользовательских данных
  function handleUpdateUser(data) {
    api.updateInfo(data.name, data.about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data.avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  function handleLogin() {
    setLoggedIn(true);
  }
  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      Auth.getContent(jwt)
      .then((res) => {
        setUserData(res.data);
        setLoggedIn(true);
        history.push('/');
      })
      .catch ((err) => console.log(err));
    }
  }
  


  
  const [infoData, setInfoData] = React.useState({});
  function failed() {
    setInfoData({text: "Что-то пошло не так! Попробуйте еще раз.", image: errorPic})}
  function passed() {
    setInfoData({text: "Вы успешно зарегистрировались!", image: accesPic})}



  //*DOM
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onLoad={saveLoader} isLoading={isSaveLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onLoad={saveLoader} isLoading={isSaveLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleUpdatePlace} onLoad={createLoader} isLoading={isCreateLoading} />
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={ConfirmDelete} name="popupConfirm" title="Вы уверены?" submitText="Да" />
        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={dataImage}/>
        <InfoTooltip text={infoData.text} image={infoData.image} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onLoad={saveLoader} isLoading={isSaveLoading} />
        <div className="page">
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={userData} />
          <main className="content">
            <Switch>
              <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlacePopup={handleAddPlaceClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
              />
              <Route path="/signup">
                <Register onShow={handleInfoTooltip} failed={failed} passed={passed} />
              </Route>
              <Route path="/signin">
                <Login onLogin={handleLogin} />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/signin" /> : <Redirect to="/signup" />}
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
