import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
// import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'; //11
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
// import EditDeletePopup from './EditDeletePopup'; !!!
 
function App() {
  const [avatarPopupOpen, setAvatarPopupOpen] = React.useState(false); //Открытие попапа аватара
  const [profilePopupOpen, setProfilePopupOpen] = React.useState(false); // Открытие попапа редактирования профиля
  const [newCardPopupOpen, setNewCardPopupOpen] = React.useState(false); //Открытие попапа добавления новой карточки
  // const [confirmPopupOpen, setConfirmPopupOpen] = React.useState(false); //Подтвержение удаления карточки    !!!
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false); //Открытие картинки в большом размере
  const [cardData, setCardData] = React.useState({});
  const [cardsInfo, setCardsInfo] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''}); //11

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

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
      <div className="App">
        <div className="page">
          <Header />
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
          <EditAvatarPopup avatarPopupOpen={avatarPopupOpen} setAvatarPopupOpen={setAvatarPopupOpen} onUpdateAvatar={handelUpdateAvatar} />
          <EditProfilePopup profilePopupOpen={profilePopupOpen} setProfilePopupOpen={setProfilePopupOpen} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup newCardPopupOpen={newCardPopupOpen} setNewCardPopupOpen={setNewCardPopupOpen} handleAddPlaceSubmit={handleAddPlaceSubmit} cardsInfo={cardsInfo} />
          {/* <EditDeletePopup confirmPopupOpen={confirmPopupOpen} setConfirmPopupOpen={setConfirmPopupOpen} onCardDelete={handleCardDelete} cardsInfo={cardsInfo} /> */}
          {//открытие картинки в большом размере
          imagePopupOpen && <ImagePopup {...cardData} setImagePopupOpen={setImagePopupOpen} />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;