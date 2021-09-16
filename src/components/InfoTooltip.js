import closePopupImg from '../images/CloseIcon.svg';

const InfoTooltip = ({ name, onClose, onSubmit, children, isOpen }) => {
    return (
        <div className={`popup  ${isOpen && "popup_opened"} popup_${name}`}>
        <div className="popup__container popup__container_profile">
            <button type="button" className={`popup__close popup__close_${name}`} onClick={onClose}>
                <img src={closePopupImg} alt="Крестик" />
            </button>
            <form onSubmit={onSubmit} className="form" action="#">
                {children}
            </form>
        </div>
        </div>
    )
}

export default InfoTooltip;