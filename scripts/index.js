// @todo: Темплейт карточки
function createCard(cardAttribute, deleteAttribute) {
    const template = document.querySelector('#card-template');
    const item = template.content.cloneNode(true);
    const templateCard = item.querySelector('.card');
    const templateImage = item.querySelector('.card__image');
    const templateTitle = item.querySelector('.card__title');
    templateImage.src = cardAttribute.link;
    templateImage.alt = cardAttribute.alt;
    templateTitle.textContent = cardAttribute.name;

    const deleteButton = templateCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteAttribute);
    return templateCard;
}
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function deleteCard(buttonEvent) {
    const listItem = buttonEvent.target.closest('.card');
    listItem.remove();
}
// @todo: Вывести карточки на страницу
const displayCard = document.querySelector('.places__list');
initialCards.map((placesList) => {
    const templateCard = createCard(placesList, deleteCard);
    displayCard.append(templateCard);
});