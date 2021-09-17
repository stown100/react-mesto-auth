import closePopupImg from '../images/CloseIcon.svg';

function PopupWithForm({children, name, title, isOpen, onClose , button, onSubmit}) {
    return (
        <div className={`popup  ${isOpen && "popup_opened"} popup_${name}`}>
            <div className="popup__container popup__container_profile">
                <button type="button" className={`popup__close popup__close_${name}`} onClick={onClose}>
                    <img src={closePopupImg} alt="Крестик" />
                </button>
                <form onSubmit={onSubmit} className="form" action="#" name={`${name}`}>
                    <h3 className="form__title">{title}</h3>
                    {children}
                    <button type="submit" className="form__button">{button}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;