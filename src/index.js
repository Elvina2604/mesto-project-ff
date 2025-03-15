import '../src/pages/index.css';
import { createCard, deleteCard, like} from './components/card.js';
import { openModal, closeModal} from '../src/components/modal.js';
// import { initialCards } from '../src/components/cards.js';
import {validationConfig} from '../src/components/validation.js';
import {enableValidation, clearValidation} from '../src/components/validation.js';
import {getInformationUser, getCards, addNewCardApi, editAvatarUser, editInformationUser} from '../src/components/api.js';

// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const popupCloseTypeImage = popupTypeImage.querySelector('.popup__close');
const popupCloseTypeAvatar = popupEditAvatar.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseTypeEdit = popupTypeEdit.querySelector('.popup__close');

const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCloseTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');

//формы модальных окон
const popupFormEdit = document.forms.editProfile;
const popupFormNewCard = document.forms.newPlace;
const popupFormEditAvatar = document.forms.updateAvatar;

let userId;

//Начальная загрузка информации о пользователе и карточек с сервера
Promise.all([getInformationUser(), getCards()])
.then(([user, initialCards]) => {
    userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.background = `url(${user.avatar})`;

    initialCards.forEach((cardData) => {
        const names = cardData.likes.map(likes => likes.name);
        const userLiked = names.includes(user.name);

        const card = createCard(cardData, openPopupImage, deleteCard, userLiked, userId);
        cardsContainer.append(card);
    })
})
.catch(error => console.log(error))


// Редактирование имени и информации о себе
// Открытие аватара на редактирование
function openEditAvatar () {
    clearValidation(popupEditAvatar, validationConfig);
    openModal(popupEditAvatar);
}

//Редактирование аватара
function handleClosePopupEditAvatar (evt) {
    evt.preventDefault();
    renderLoading(true, popupFormEditAvatar);
    editAvatarUser(evt.target.avatar.value)
    .then(data => {
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        closeModal(popupEditAvatar);
        popupFormEditAvatar.reset()
    })
    .catch(err => console.log(err))
    .finally(() => {
        renderLoading(false, popupFormEditAvatar);
    });
};

// Редактирование профиля
// открытие формы заполнены значениями, которые отображаются на странице
function openEditProfileModal () {
    clearValidation(popupTypeEdit, validationConfig);
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    openModal(popupTypeEdit);
}

// кнопка "закрыть"
function handleClosePopupByCloseButton (event) {
    const popupModal = event.target.closest('.popup');
    closeModal(popupModal);
    clearValidation(popupTypeEdit, validationConfig);
}

// изменение страницы через попап
function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    renderLoading(true, popupFormEdit);
    const profileName = popupInputTypeName.value;
    const profileOccupation = popupInputTypeDescription.value;
    profileTitle.textContent = profileName;
    profileDescription.textContent = profileOccupation;  // Вставьте новые значения с помощью textContent
    editInformationUser(profileName, profileOccupation)
        .then(data => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popupTypeEdit);
        })
        .catch(error => console.log(error))
        .finally(() => {
            renderLoading(false, popupFormEdit);
        });
};

// форма добавления карточки
function handleCardAddFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupFormNewCard);
    const newCardName = popupInputTypeCardName.value;
    const newCardLink = popupInputTypeUrl.value;
    addNewCardApi(newCardName, newCardLink)
        .then(card => {
            // cardsContainer.prepend(createCard(card, openPopupImage, deleteCard, like, userId));
            const cardItem = createCard(card, openPopupImage, deleteCard, like, userId);
            cardsContainer.prepend(cardItem);
            closeModal(popupTypeNewCard);
                })
        .catch(error => console.log(error))
        .finally(() => {
            renderLoading(false, popupFormNewCard);
        });
};

// // Функция добавления карточки
// function addCard(cardElement, cardElementNew) {
//     if (cardElementNew) {
//         cardsContainer.prepend(createCard(cardElement, deleteCard, like, openPopupImage));
//     } else {
//         cardsContainer.append(createCard(cardElement, deleteCard, like, openPopupImage));
//     }
// }

//открытие попапа с картинкой
function openPopupImage (event) {
    // popupImage.setAttribute('src', event.target.src);
    // popupImage.setAttribute('alt', event.target.alt);
    // popupImageCaption.textContent = event.target.alt;
    const card = event.target;
    const cardName = card.alt;
    const cardLink = card.src
    popupImageCaption.textContent = cardName;
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    openModal(popupTypeImage);
}

//Активация валидации
enableValidation(validationConfig);

// добавляем обработчики
profileAvatar.addEventListener('click', openEditAvatar);

popupFormEditAvatar.addEventListener('submit', handleClosePopupEditAvatar);

profileEditButton.addEventListener('click', openEditProfileModal);

popupCloseTypeEdit.addEventListener('click', handleClosePopupByCloseButton);
popupCloseTypeNewCard.addEventListener('click', handleClosePopupByCloseButton);
popupCloseTypeImage.addEventListener('click', handleClosePopupByCloseButton);
// popupCloseTypeAvatar.addEventListener('click',  function () {
//     closeModal(popupEditAvatar);
//     clearValidation(popupFormEditAvatar, validationConfig);
//   });

popupFormEdit.addEventListener('submit', handleProfileEditFormSubmit);

cardAddButton.addEventListener('click', function () {
    clearValidation(popupFormNewCard, validationConfig);
    openModal(popupTypeNewCard);
})

popupFormNewCard.addEventListener('submit', handleCardAddFormSubmit);

// Улучшенный UX всех форм

function renderLoading(isLoad, form) {
    form.button.textContent = isLoad ? 'Сохранение...' : 'Сохранить';
  };
