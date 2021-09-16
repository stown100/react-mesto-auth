import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'; //11
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
// import EditDeletePopup from './EditDeletePopup'; !!!
import { Route, Switch, useHistory, Redirect, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from '../utils/Auth';
import NavBar from './NavBar';
import EditRegisterPopup from './EditRegisterPopup';
import EditEnterPopup from './EditEnterPopup';
 
function App() {
  const [avatarPopupOpen, setAvatarPopupOpen] = React.useState(false); //Открытие попапа аватара
  const [profilePopupOpen, setProfilePopupOpen] = React.useState(false); // Открытие попапа редактирования профиля
  const [newCardPopupOpen, setNewCardPopupOpen] = React.useState(false); //Открытие попапа добавления новой карточки
  const [registerPopupOpen, setRegisterPopupOpen] = React.useState(false); //попап Подтвержения регистрации
  const [enterPopupOpen, setEnterPopupOpen] = React.useState(false);
  // const [confirmPopupOpen, setConfirmPopupOpen] = React.useState(false); //Подтвержение удаления карточки    !!!
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false); //Открытие картинки в большом размере
  const [cardData, setCardData] = React.useState({});
  const [cardsInfo, setCardsInfo] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const history = useHistory();

  //Приём данных с сервера
  React.useEffect(() => {
    // let myId = null;
    Promise.all([api.getUserInfo(),
    api.getInitialCards()])
      .then(([data, cardInfo]) => {
        //   myId = userInfoClass._id;
        setCurrentUser(data);
        setCardsInfo(cardInfo);
      })
      .catch(() => {
        console.error('Что-то сломалось!')
      })
  }, [])

  function handleCardLike(likes, cardId) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeCard(cardId, isLiked)
        .then((newCard) => {
            setCardsInfo((state) => state.map((c) => c._id === cardId ? newCard : c));
        })
        .catch(() => {
            console.log('Что-то сломалось!')
        })
}

//Удаление карточки
  function handleCardDelete(cardId) {
      api.deleteTask(cardId)
          .then(() => {
              setCardsInfo((state) => state.filter((card) => card._id !== cardId))
          })
          .catch(() => {
              console.log('Что-то сломалось!')
          })
  }

    //Добавление карточки
    function handleAddPlaceSubmit({name, link}) {
      api.addTask({name, link})
      .then((newCard) => {
        setCardsInfo([newCard, ...cardsInfo]); 
        setNewCardPopupOpen(false)
      })
      .catch(() => {
        console.log('Что-то сломалось!')
      })
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
  const handleUpdateUser = ({name, about}) => {
    api.setUserInfo({name, about})
    .then((data) => {
      setProfilePopupOpen(false);
      setCurrentUser(data);
    })
    .catch(() => {
      console.log('Что-то сломалось!')
    })
  }

  const handelUpdateAvatar = (avatar) => {
    api.setUserAvatar(avatar)
    .then((data) => {
      setAvatarPopupOpen(false)
      setCurrentUser(data);
    })
    .catch(() => {
        console.log('Что-то сломалось!')
      })
  }

  const auth = async (jwt) => {
    return Auth.getContent(jwt)
      .then((res) => {
        // Проверка токена, если токен ваидный записываем данные в state, иначе удаляем токен из localStorage; 
        if (res) {
          setLoggedIn(true);
          setUserData({
            password: res.password,
            email: res.email
          });
        }
      })
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


  const onRegister = ({ password, email }) => {
    return Auth.register(password, email).then((res) => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      return res;
    });
  };

  const onLogin = ({ password, email }) => {
    return Auth.login(password, email).then((res) => {
      if (!res) throw new Error('Неправильные имя пользователя или пароль');
      if (res.jwt) {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.jwt);
      }
    });
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  };
  
                            //Как передать email в header, Сделать меню бургер
  return (
    <Switch>
      <CurrentUserContext.Provider value={{currentUser}}>
        <div className="App">
          <div className="page">
          <ProtectedRoute exact loggedIn={loggedIn} path="/">
            <Header loggedIn={loggedIn} setUserData={setUserData} onSignOut={onSignOut}>
              <NavBar email={(res) => setUserData({email: res.email})} onSignOut={onSignOut}>
                  <ul className="navbar__nav">
                      {/* <li className="navbar__link">{email}</li> */}
                      <li><button onClick={onSignOut} className="navbar__link navbar__button">Выйти</button></li>
                  </ul>
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
              <Register onRegister={onRegister} setRegisterPopupOpen={setRegisterPopupOpen} setEnterPopupOpen={setEnterPopupOpen}/>
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} setEnterPopupOpen={setEnterPopupOpen}/>
            </Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
          
          <EditAvatarPopup avatarPopupOpen={avatarPopupOpen} setAvatarPopupOpen={setAvatarPopupOpen} onUpdateAvatar={handelUpdateAvatar} />
            <EditProfilePopup profilePopupOpen={profilePopupOpen} setProfilePopupOpen={setProfilePopupOpen} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup newCardPopupOpen={newCardPopupOpen} setNewCardPopupOpen={setNewCardPopupOpen} handleAddPlaceSubmit={handleAddPlaceSubmit} cardsInfo={cardsInfo} />
            <EditRegisterPopup registerPopupOpen={registerPopupOpen} setRegisterPopupOpen={setRegisterPopupOpen}/>
            <EditEnterPopup enterPopupOpen={enterPopupOpen} setEnterPopupOpen={setEnterPopupOpen} />
            {/* <EditDeletePopup confirmPopupOpen={confirmPopupOpen} setConfirmPopupOpen={setConfirmPopupOpen} onCardDelete={handleCardDelete} cardsInfo={cardsInfo} /> */}
            {//открытие картинки в большом размере
            imagePopupOpen && <ImagePopup {...cardData} setImagePopupOpen={setImagePopupOpen} />}
          </div>
        </div>
      </CurrentUserContext.Provider>
        </Switch>
  );
}

export default App;