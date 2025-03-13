import {deleteCardOnAPI, deleteLikeOnAPI, likeCardOnAPI} from './api'

// Функция создания карточки 
function createCard(cardData, onDelete, likeUser, onImageClick, UserId) {
    const template = document.querySelector('#card-template');
    const item = template.content.cloneNode(true);
    const cardElement = item.querySelector('.card');
    const cardImage = item.querySelector('.card__image');
    const cardTitle = item.querySelector('.card__title');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-counts');
    likeCount.textContent = cardData.likes.length;

    deleteButton.style.visibility = "hidden";
    if (UserId === cardData.owner._id) {
        deleteButton.style.visibility = "visible";
    deleteButton.addEventListener("click", (event) => onDelete(event, cardData._id));
    }
    cardImage.addEventListener('click', onImageClick);
    cardLikeButton.addEventListener('click', () => {
        like(cardLikeButton, cardData._id, likeCount)
    });
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event, cardId) {

    deleteCardOnAPI(cardId)
        .then(() => {
            const card = event.target.closest('.card');
            card.remove();
        })
        .catch((error) => { 
            console.log(error);
        })
}

function like (cardLikeButton, cardId, likeCount) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active')
    if(isLiked === true) {
    likeCardOnAPI(cardId, isLiked)
        .then(data => {
            cardLikeButton.classList.toggle('card__like-button_is-active');
            likeCount.nextElementSibling.textContent = data.likes.length;
        })
        .catch(error => console.log(error))
    } else {
    deleteLikeOnAPI(cardId, isLiked)
    .then(data => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        likeCount.nextElementSibling.textContent = data.likes.length;
    })
    .catch(error => console.log(error))
    }
}

// const haveLike = (like) => {
//     return like.classList.contains('card__like-button_is-active');
// }

// const updateLike = (button, count) => {
//     button.classList.toggle('card__like-button_is-active');
//     button.nextElementSibling.textContent = count.likes.length;
// }

export { createCard, deleteCard, like};