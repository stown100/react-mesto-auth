export const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__input-border-error',
    errorClass: 'form__input'
}

export const editAvatarForm = document.querySelector('.form[name = "formRedactAvatar"]'); //9
export const editProfileForm = document.querySelector('.form[name = "formRedactProfile"]');
export const editNewCardForm = document.querySelector('.form[name = "formNewCard"]');
export const popupDeleteCard = document.querySelector('.popup_delete'); //9
export const popupAvatar = document.querySelector('.popup_avatar');  //9
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
// export const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
export const editBtn = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup_profile');
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_role');
export const buttonOpenPopupCard = document.querySelector('.profile__vector-button');
export const newCardPopup = document.querySelector('.popup_images');
export const sectionElements = document.querySelector('.elements');
export const popupImgOpen = document.querySelector('.popup_img');
export const cardSelector = '#tmplt';
export const avatarInput = document.querySelector('.form__input_type_avatar'); //9
export const profileAvatar = document.querySelector('.profile__jack');
// export const initialCards = [                                           //Возможно не нужен
//     {
//         name: 'Nissan Silvia s13',
//         link: 'https://im0-tub-ru.yandex.net/i?id=33be3fce98a4a6c2b273f11fb825b542-l&n=13',
//     },
//     {
//         name: 'Toyota Supra',
//         link: 'https://avatars.mds.yandex.net/get-zen_doc/3310860/pub_60263f46b1a0bb52b45dcfd8_6026409afa0bd9159aa9d9ce/scale_1200',
//     },
//     {
//         name: 'Nissan GTR',
//         link: 'https://i.pinimg.com/originals/74/1c/a5/741ca51ca955fd9aa68e45b6a09ec7e0.jpg',
//     },
//     {
//         name: 'Mazda RX-7',
//         link: 'https://sun9-74.userapi.com/impf/c857432/v857432776/9cfb1/OUelKKO2zx8.jpg?size=1280x1280&quality=96&sign=e56f8a7fbcdc62443c948420b7b924f0&c_uniq_tag=KXvBLJjJs1yQdMaN5lgYZY-y0OjV01oGGKTAaftXl_E&type=album',
//     },
//     {
//         name: 'Toyota Mark II',
//         link: 'https://sun9-7.userapi.com/impf/c855136/v855136329/1b697a/y96JcBXh43M.jpg?size=604x604&quality=96&sign=3c051d99a7d7db35c5ab390034b71a33&type=album',
//     },
//     {
//         name: 'Mitsubishi EVO 9',
//         link: 'https://i.pinimg.com/originals/14/42/58/14425875af759f49e319307a732dcfd4.jpg',
//     },
// ];