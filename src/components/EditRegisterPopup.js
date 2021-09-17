import check from '../images/check.svg'
import PopupWithAuthorize from "./InfoTooltip";

const EditRegisterPopup = ({registerPopupOpen, closeAllPopups}) => {

    return (
        <PopupWithAuthorize isOpen={registerPopupOpen} onClose={closeAllPopups}>
            <img src={check} className="register__popup-img"></img>
            <p className="register__popup-title">Вы успешно зарегестрировались!</p>
        </PopupWithAuthorize>
    )
}

export default EditRegisterPopup;