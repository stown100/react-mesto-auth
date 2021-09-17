import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const EditAvatarPopup = ({avatarPopupOpen, onUpdateAvatar, closeAllPopups}) => {
    const { currentUser } = React.useContext(CurrentUserContext);
    const inputRef = React.useRef();

        // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
      inputRef.current.value = currentUser.avatar
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: inputRef.current.value
        });
      } 

    return (
        <PopupWithForm isOpen={avatarPopupOpen} onClose={closeAllPopups} onSubmit={handleSubmit}
        name='avatar' title='Обновить аватар' button='Сохранить'>
          <input type="url" id="avatar" className="form__input form__input_type_avatar" name="avatar"
            placeholder="ссылка на аватар" ref={inputRef} required />
          <span id="avatar-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;