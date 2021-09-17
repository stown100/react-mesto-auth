import check from '../images/ErrPopup.svg';
import PopupWithAuthorize from "./InfoTooltip";

const EditRegisterPopup = ({enterPopupOpen, closeAllPopups}) => {

    return (
        <PopupWithAuthorize isOpen={enterPopupOpen} onClose={closeAllPopups}>
            <img src={check} className="register__popup-img"></img>
            <p className="register__popup-title">Что-то пошло не так! Попробуйте ещё раз.</p>
        </PopupWithAuthorize>
    )
}

export default EditRegisterPopup;