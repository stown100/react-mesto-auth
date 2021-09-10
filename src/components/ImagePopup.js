import closePopupImg from '../images/CloseIcon.svg';


function ImagePopup({ link, name, setImagePopupOpen }) {
    return (
        <div className={'popup popup_img popup_opened'}>
            <div className="popup__container popup__container_img">
                <button type="button" className="popup__close popup__close_img" onClick={() => setImagePopupOpen(false)}>
                    <img src={closePopupImg} alt="Крестик" />
                </button>
                <img src={link} className="popup__img" alt="фото" />
                <h2 className="popup__title">{name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;