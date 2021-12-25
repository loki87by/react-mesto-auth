import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import * as Auth from '../utils/Auth';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/Api';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import accesPic from '../images/resOk.svg';
import errorPic from '../images/false.svg';
import MobileMenu from './MobileMenu';
import '../index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { /* HashRouter, (uncomment after gh-pages deploy) */ Route, Switch, Redirect, useHistory } from 'react-router-dom';
  


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
  const [infoData, setInfoData] = React.useState({});
  const [headerData, setHeaderData] = React.useState({crossLink: "/signin", linkText: "Вход"});
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({
    email: "",
    _id: ""
  });

  //**хуки
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
  //*функции содержимого infoTooltip
  function setFailedMessage() {
    setInfoData({text: "Что-то пошло не так! Попробуйте еще раз.", image: errorPic})
  }
  function setPassedMessage() {
    setInfoData({text: "Вы успешно зарегистрировались!", image: accesPic})
  }
  function setEnterLink() {
    setHeaderData({crossLink: "/signup", linkText: "Регистрация"})
  }
  function setRegLink() {
    setHeaderData({crossLink: "/signin", linkText: "Войти"})
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

  //**функции аутентификации и авторизации
  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  function handleLogin() {
    Auth.login({ email, password })
    .then((data) => {
      if (data){
        setEmail('');
        setPassword('');
        history.push('/');
        setLoggedIn(true)
        return;
      }
    }
    )
    .catch((err) => console.log(err));
  }
  function onRegister() {
    Auth.register(email, password)
    .then((res) => {
      if(res) {
        history.push('/signin');
        setPassedMessage()
        handleInfoTooltip()
      } else {
        setFailedMessage()
        handleInfoTooltip()
      }
    })
    .catch((err) => console.log(err));
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
  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false)
    history.push('/signin');
  }

  //*функции для смартфона
  function openMenu() {
    setMenuOpen(true)
  }
  function closeMenu() {
    setMenuOpen(false)
  }

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
          {loggedIn ? <MobileMenu userData={userData} isOpen={isMenuOpen} signOut={signOut} closeMenu={closeMenu} /> : ''}
          <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} email={userData.email} openMenu={openMenu} closeMenu={closeMenu} signOut={signOut} setLoggedIn={setLoggedIn} crossLink={headerData.crossLink} linkText={headerData.linkText} setEnterLink={setEnterLink} setRegLink={setRegLink} />
          <main className="content">
            {/* <HashRouter> (uncomment after gh-pages deploy) */}
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
                <Register onRegister={onRegister} email={email} setEmail={setEmail} password={password} setPassword={setPassword} changeLink={setEnterLink} />
              </Route>
              <Route path="/signin">
                <Login onLogin={handleLogin} changeLink={setRegLink} email={email} password={password} setPassword={setPassword} setEmail={setEmail} setLoggedIn={setLoggedIn}/>
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
              </Route>
            </Switch>
            {/* </ HashRouter> (uncomment after gh-pages deploy) */}
          </main>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
