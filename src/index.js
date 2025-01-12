import '../src/pages/index.css';
import { createCard, deleteCard, like} from './components/card.js';
import { openModal, closeModal} from '../src/components/modal.js';
import { initialCards } from '../src/components/cards.js';


// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
const profileImage = document.querySelector('.profile__image');
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
const popupFormNew = document.querySelector('.popup__form[name="new-place"]');
const popupInputTypeCardName = popupFormNew.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = popupFormNew.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCloseTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
initialCards.map((placesList) => {
    // const cardElement = createCard(placesList, deleteCard);
    cardsContainer.append(createCard(placesList, deleteCard, like, openPopupImage));
});

// Редактирование имени и информации о себе
// открытие формы заполнены значениями, которые отображаются на странице
profileEditButton.addEventListener('click', () => {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    openModal(popupTypeEdit);
})

// кнопка "закрыть"

function closePopup (event) {
    const popupModal = event.target.closest('.popup');
    closeModal(popupModal);
}

popupCloseTypeEdit.addEventListener('click', closePopup);
popupCloseTypeNewCard.addEventListener('click', closePopup);
popupCloseTypeImage.addEventListener('click', closePopup);

// изменение страницы через попап

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // const nameInput = popupInputTypeName.value;
    // const jobInput = popupInputTypeDescription.value;// Получите значение полей jobInput и nameInput из свойства value

    profileTitle.textContent = popupInputTypeName.value;
    profileDescription.textContent = popupInputTypeDescription.value;  // Вставьте новые значения с помощью textContent

    closeModal(popupTypeEdit);
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupFormEdit.addEventListener('submit', handleFormSubmit);


//кнопка добавить
profileAddButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
})

// форма добавления карточки



function handleFormNewSubmit(evt) {
    evt.preventDefault();
    const newForm = {
        name: popupInputTypeCardName.value,
        link: popupInputTypeUrl.value
    };
    addCard(newForm, true);
    popupFormNew.reset();
    closeModal(popupTypeNewCard);
}

popupFormNew.addEventListener('submit', handleFormNewSubmit);

// Добавления карточки


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
//плавное открытие и закрытие попапов
const popup = document.querySelectorAll('.popup');
popup.forEach(function (popupModal) {
    popupModal.classList.add('popup_is-animated');
});