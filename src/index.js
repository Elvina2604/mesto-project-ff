import '../src/pages/index.css';
import { createCard, deleteCard, like} from './components/card.js';
import { openModal, closeModal} from '../src/components/modal.js';
import { initialCards } from '../src/components/cards.js';


// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseTypeImage = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popupFormEdit = document.querySelector('.popup__form[name="edit-profile"]');
const popupInputTypeName = popupFormEdit.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupFormEdit.querySelector('.popup__input_type_description');
const popupFormNewCard = document.querySelector('.popup__form[name="new-place"]');
const popupInputTypeCardName = popupFormNewCard.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = popupFormNewCard.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCloseTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
initialCards.map((placesList) => {
    cardsContainer.append(createCard(placesList, deleteCard, like, openPopupImage));
});

// Редактирование имени и информации о себе
// открытие формы заполнены значениями, которые отображаются на странице
function formNewCard () {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    openModal(popupTypeEdit);
}

// кнопка "закрыть"

function handleClosePopupByCloseButton (event) {
    const popupModal = event.target.closest('.popup');
    closeModal(popupModal);
}

// изменение страницы через попап

function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // const nameInput = popupInputTypeName.value;
    // const jobInput = popupInputTypeDescription.value;// Получите значение полей jobInput и nameInput из свойства value

    profileTitle.textContent = popupInputTypeName.value;
    profileDescription.textContent = popupInputTypeDescription.value;  // Вставьте новые значения с помощью textContent

    closeModal(popupTypeEdit);
}

// форма добавления карточки

function handleCardAddFormSubmit(evt) {
    evt.preventDefault();
    const newForm = {
        name: popupInputTypeCardName.value,
        link: popupInputTypeUrl.value
    };
    addCard(newForm, true);
    popupFormNewCard.reset();
    closeModal(popupTypeNewCard);
}

// Функция добавления карточки

function addCard(cardElement, cardElementNew) {
    if (cardElementNew) {
        cardsContainer.prepend(createCard(cardElement, deleteCard, like, openPopupImage));
    } else {
        cardsContainer.append(createCard(cardElement, deleteCard, like, openPopupImage));
    }
}

//открытие попапа с картинкой
function openPopupImage (event) {
    popupImage.setAttribute('src', event.target.src);
    popupImage.setAttribute('alt', event.target.alt);
    popupImageCaption.textContent = event.target.alt;
    openModal(popupTypeImage);
}

// добавляем обработчики
profileEditButton.addEventListener('click', formNewCard);

popupCloseTypeEdit.addEventListener('click', handleClosePopupByCloseButton);
popupCloseTypeNewCard.addEventListener('click', handleClosePopupByCloseButton);
popupCloseTypeImage.addEventListener('click', handleClosePopupByCloseButton);

popupFormEdit.addEventListener('submit', handleProfileEditFormSubmit);

cardAddButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
})

popupFormNewCard.addEventListener('submit', handleCardAddFormSubmit);