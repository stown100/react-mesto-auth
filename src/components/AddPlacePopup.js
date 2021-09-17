import PopupWithForm from "./PopupWithForm";
import React from "react";

const AddPlacePopup = ({newCardPopupOpen, closeAllPopups, handleAddPlaceSubmit}) => {
    const [cardsNameValue, setCardsNameValue] = React.useState('');
    const [cardsTitleValue, setCardsTitleValue] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        handleAddPlaceSubmit({
            name: cardsNameValue,
            link: cardsTitleValue,
        });
    }

    function onAddPlaceName(e) {
        setCardsNameValue(e.target.value)
    }

    function onAddPlaceLink(e) {
        setCardsTitleValue(e.target.value)
    }
    
    return (
        <PopupWithForm isOpen={newCardPopupOpen} onClose={closeAllPopups} onSubmit={handleSubmit} name='images' title='Новое место' button='Сохранить'>
        <input type="text" id="name-card" className="form__input form__input_type_title" placeholder="Название" onChange={onAddPlaceName}
          name="title" minLength="2" maxLength="30" value={cardsNameValue} required />
        <span id="name-card-error" className="form__input-error"></span>
        <input type="url" id="link" className="form__input form__input_type_link" placeholder="ссылка на картинку" onChange={onAddPlaceLink}
          name="link" value={cardsTitleValue} required />
        <span id="link-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;