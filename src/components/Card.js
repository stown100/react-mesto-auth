import React from 'react';
import deleteImg from '../images/delete.svg';
import likeImg from '../images/Group.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


const Card = ({link, name, likes, onCardClick, onCardLike, onCardDelete, owner, cardId, onDeletePopup}) => {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn =  owner._id === currentUser.currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
    `${isOwn ? 'element__delete' : 'element__delete_hidden'}`);
    //Проверка, поставлен ли лайк
    const isLiked = likes.some((i) => i._id === currentUser.currentUser._id);
    const cardLikeButtonClassName = (
        `${isLiked ? 'element__group_active' : 'element__group'}`);

    const handleClick = () => onCardClick(link, name) //Открытие
    const handleLikeClick = () => onCardLike(likes, cardId) //Лайк
    const handleCardDelete = () => onCardDelete(cardId)  //Удаление
    // const deletePopup =() => onDeletePopup(cardId) !!!
    return (
        <article className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}>
                <img src={deleteImg} className="element__img-delete" alt="Удалить" />
            </button>
            <img src={link} className="element__img"
                alt="Картинка" onClick={handleClick}/>
            <div className="element__block">
                <h2 className="element__title">{name}</h2>
                <button type="button" className="element__like-btn">
                    <img src={likeImg} className={cardLikeButtonClassName} onClick={handleLikeClick} alt="Лайк" />
                    <p className= "element__like_number">{likes.length}</p>
                </button>
            </div>
        </article>
    )
}

export default Card;