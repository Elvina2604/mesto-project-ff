// Функция создания карточки 
function createCard(cardData, onDelete, like, imageToggle)
     {
    const template = document.querySelector('#card-template');
    const item = template.content.cloneNode(true);
    const cardElement = item.querySelector('.card');
    const cardImage = item.querySelector('.card__image');
    const cardTitle = item.querySelector('.card__title');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.alt;
    cardTitle.textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const placesList = document.querySelector('.places__list');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    deleteButton.addEventListener('click', onDelete);
    placesList.addEventListener('click', imageToggle);
    cardLikeButton.addEventListener('click', like);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}

function like (likeBtn) {
    likeBtn.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, like};