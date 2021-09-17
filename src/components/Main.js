import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import profileEdit from '../images/EditButton.svg';
import profileVector from '../images/Vector.svg';
import '../index.css';
import Card from './Card';
import Spinner from './Spinner';

function Main({ setAvatarPopupOpen,
    setProfilePopupOpen,
    setNewCardPopupOpen,
    onCardClick,
    cardsInfo,
    onCardLike,
    onCardDelete,
    onDeletePopup,
}) {
    const { currentUser } = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__block">
                    <div className="profile__redact-image" onClick={() => setAvatarPopupOpen(true)}><img src={currentUser.avatar} className="profile__jack"
                        alt="Аватар" /><span className="profile__redact-img"></span></div>
                    <div className="profile__info">
                        <div className="profile__title-button">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={() => setProfilePopupOpen(true)}>
                                <img className="profile__edit" src={profileEdit}
                                    alt="Редактировать" />
                            </button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__vector-button" onClick={() => setNewCardPopupOpen(true)}>
                    <img src={profileVector} className="profile__vector" alt="Плюс" />
                </button>
            </section>
            <section className="elements">
                {cardsInfo
                    ? (cardsInfo.map(({ link, name, likes, _id, owner }) =>
                        (<Card link={link} name={name} likes={likes} key={_id}
                            onCardClick={onCardClick} onCardDelete={onCardDelete}
                            owner={owner} onCardLike={onCardLike} cardId={_id}
                            onDeletePopup={onDeletePopup}
                            />)))
                    : (<h3><Spinner /></h3>)}
            </section>
        </main>
    )
}

export default Main;