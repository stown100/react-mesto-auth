import check from '../images/check.svg'
import PopupWithAuthorize from "./InfoTooltip";

const EditRegisterPopup = ({registerPopupOpen, setRegisterPopupOpen}) => {

    return (
        <PopupWithAuthorize isOpen={registerPopupOpen} onClose={() => setRegisterPopupOpen(false)}>
            <img src={check} className="register__popup-img"></img>
            <p className="register__popup-title">Вы успешно зарегестрировались!</p>
        </PopupWithAuthorize>
    )
}

export default EditRegisterPopup;