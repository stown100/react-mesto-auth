import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'; //11
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
// import EditDeletePopup from './EditDeletePopup'; !!!
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from '../utils/Auth';
import NavBar from './NavBar';
import EditRegisterPopup from './EditRegisterPopup';
import EditEnterPopup from './EditEnterPopup';
import NavBarMenu from './NavBarMenu';

function App() {
  const [avatarPopupOpen, setAvatarPopupOpen] = React.useState(false); //Открытие попапа аватара
  const [profilePopupOpen, setProfilePopupOpen] = React.useState(false); // Открытие попапа редактирования профиля
  const [newCardPopupOpen, setNewCardPopupOpen] = React.useState(false); //Открытие попапа добавления новой карточки
  const [registerPopupOpen, setRegisterPopupOpen] = React.useState(false); //попап Подтвержения регистрации
  const [enterPopupOpen, setEnterPopupOpen] = React.useState(false);
  const [burgerMenu, setBurgerMenu] = React.useState(false); //Меню бургер

  // const [confirmPopupOpen, setConfirmPopupOpen] = React.useState(false); //Подтвержение удаления карточки    !!!
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false); //Открытие картинки в большом размере
  const [cardData, setCardData] = React.useState({});
  const [cardsInfo, setCardsInfo] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const history = useHistory();

  const closeAllPopups = () => {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setNewCardPopupOpen(false);
    setRegisterPopupOpen(false);
    setEnterPopupOpen(false);
    setImagePopupOpen(false);
    setBurgerMenu(false);
  }

  //Приём данных с сервера
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    // let myId = null;
    Promise.all([api.getUserInfo(token),
    api.getInitialCards(token)])
      .then(([data, cardInfo]) => {
        //   myId = userInfoClass._id;
        setCurrentUser(data);
        setCardsInfo(cardInfo);
      })
      .catch(() => {
        console.error('Что-то сломалось! тут')
      })
  }, [])

  function handleCardLike(likes, cardId) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    const token = localStorage.getItem('jwt');
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeCard(cardId, isLiked, token)
      .then((newCard) => {
        setCardsInfo((state) => state.map((c) => c._id === cardId ? newCard : c));
      })
      .catch(() => console.log('Что-то сломалось!'))
  }

  //Удаление карточки
  function handleCardDelete(cardId) {
    const token = localStorage.getItem('jwt');
    api.deleteTask(cardId, token)
      .then(() => {
        setCardsInfo((state) => state.filter((card) => card._id !== cardId))
      })
      .catch(() => console.log('Что-то сломалось!'))
  }

  //Добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    const token = localStorage.getItem('jwt');
    api.addTask({ name, link }, token)
      .then((newCard) => {
        setCardsInfo([newCard, ...cardsInfo]);
        setNewCardPopupOpen(false)
      })
      .catch(() => console.log('Что-то сломалось!'))
  }
  //Открытие попапа картинки
  const onCardClick = (link, name) => {
    setImagePopupOpen(true);
    setCardData({ link, name })
  }

  // //Открытие попапа подтверждения   !!!
  // const onDeletePopup = (_id) => {
  //   debugger
  //   setCardData({ _id })

  //   setConfirmPopupOpen(true);
  // }

  //Первый попап отправка данных на сервер
  const handleUpdateUser = ({ name, about }) => {
    const token = localStorage.getItem('jwt');
    api.setUserInfo({ name, about }, token)
      .then((data) => {
        setProfilePopupOpen(false);
        setCurrentUser(data);
      })
      .catch(() => console.log('Что-то сломалось!'))
  }

  const handelUpdateAvatar = (avatar) => {
    const token = localStorage.getItem('jwt');
    api.setUserAvatar(avatar, token)
      .then((data) => {
        setAvatarPopupOpen(false)
        setCurrentUser(data);
      })
      .catch(() => console.log('Что-то сломалось!'))
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  const auth = async (jwt) => {
    return Auth.getContent(jwt)
      .then((res) => {
        // Проверка токена, если токен ваидный записываем данные в state, иначе удаляем токен из localStorage; 
        if (res.data) {
          setLoggedIn(true);
          setUserData({
            email: res.data.email
          });
        }
      })
      .catch(() => console.log('400 — Токен не передан или передан не в том формате' || '401 — Переданный токен некорректен'))
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) history.push('/');
  }, [loggedIn]);

  React.useEffect(() => {

  }, [userData])


  const onRegister = ({ password, email }) => {
    return Auth.register(password, email)
      .then((res) => {
        if (!res || res.status === 409) throw new Error('Что-то пошло не так')
        else {
          setRegisterPopupOpen(true);
        }
        return res;
      })
  };

  const onLogin = ({ password, email }) => {
    return Auth.login(password, email).then((res) => {
      if (!res.token) throw new Error('Неправильные имя пользователя или пароль');
      else {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
      }
    })
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  //Доделать меню бургер
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="App">
        <div className="page">
          <Switch>
            <ProtectedRoute exact loggedIn={loggedIn} path="/">
              <Header loggedIn={loggedIn} setUserData={setUserData} onSignOut={onSignOut}>
                <NavBar email={(res) => setUserData({ email: res.email })} onSignOut={onSignOut}>
                  <NavBarMenu burgerMenu={burgerMenu}
                    setBurgerMenu={setBurgerMenu}
                    userData={userData}
                    onSignOut={onSignOut}
                    isOpen={burgerMenu}
                    closeAllPopups={closeAllPopups} />
                </NavBar>
              </Header>
              <Main setAvatarPopupOpen={setAvatarPopupOpen}
                setProfilePopupOpen={setProfilePopupOpen}
                setNewCardPopupOpen={setNewCardPopupOpen}
                onCardClick={onCardClick}
                cardsInfo={cardsInfo}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              // onDeletePopup={onDeletePopup} !!!
              />
              <Footer />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register onRegister={onRegister} setRegisterPopupOpen={setRegisterPopupOpen} setEnterPopupOpen={setEnterPopupOpen} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} setEnterPopupOpen={setEnterPopupOpen} />
            </Route>
          </Switch>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
          <EditAvatarPopup closeAllPopups={closeAllPopups} avatarPopupOpen={avatarPopupOpen} onUpdateAvatar={handelUpdateAvatar} />
          <EditProfilePopup closeAllPopups={closeAllPopups} profilePopupOpen={profilePopupOpen} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup closeAllPopups={closeAllPopups} newCardPopupOpen={newCardPopupOpen} handleAddPlaceSubmit={handleAddPlaceSubmit} cardsInfo={cardsInfo} />
          <EditRegisterPopup closeAllPopups={closeAllPopups} registerPopupOpen={registerPopupOpen} />
          <EditEnterPopup closeAllPopups={closeAllPopups} enterPopupOpen={enterPopupOpen} />
          {/* <EditDeletePopup confirmPopupOpen={confirmPopupOpen} setConfirmPopupOpen={setConfirmPopupOpen} onCardDelete={handleCardDelete} cardsInfo={cardsInfo} /> */}
          <ImagePopup {...cardData} closeAllPopups={closeAllPopups} isOpen={imagePopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;