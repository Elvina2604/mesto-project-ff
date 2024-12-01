// @todo: Темплейт карточки
function createCard(cardData, onDelete) {
    const template = document.querySelector('#card-template');
    const item = template.content.cloneNode(true);
    const cardElement = item.querySelector('.card');
    const cardImage = item.querySelector('.card__image');
    const cardTitle = item.querySelector('.card__title');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.alt;
    cardTitle.textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', onDelete);
    return cardElement;
}
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}
// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
initialCards.map((placesList) => {
    const cardElement = createCard(placesList, deleteCard);
    cardsContainer.append(cardElement);
});