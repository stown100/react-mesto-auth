import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
                                                        //Проблема с первым инпутом, остаётся только name и ничего не вводиться
                                                        //Второй инпут не меняется
const EditProfilePopup = ({profilePopupOpen, setProfilePopupOpen, onUpdateUser}) => {
    const { currentUser } = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm isOpen={profilePopupOpen} onClose={() => setProfilePopupOpen(false)} onSubmit={handleSubmit} name='profile' title='Редактировать профиль' button='Сохранить'>
        <input type="text" id="name" className="form__input form__input_type_name" name="name"
        placeholder="Имя" minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
        <span id="name-error" className="form__input-error"></span>
        <input type="text" id="role" className="form__input form__input_type_role" name="about"
        placeholder="Профессия" minLength="2" maxLength="30" value={description} onChange={handleChangeDescription} />
        <span id="role-error" className="form__input-error"></span>
      </PopupWithForm>
    )
}

export default EditProfilePopup;