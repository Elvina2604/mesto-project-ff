import {deleteCardOnAPI, likeCardOnAPI} from './api'

// Функция создания карточки 
function createCard(cardData, onImageClick, onDelete, userLiked, userId) {
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
    // Иконка удалить у МОИХ карточек
    if (userId !== cardData.owner._id) {
        deleteButton.remove(); // скрываем иконку удалить у карточки
    } else {
        deleteButton.style.visibility = "visible";// добавляем иконку "своим" карточкам
    deleteButton.addEventListener("click", () => {
        onDelete(cardElement, cardData._id); 
        cardElement.remove();
    }); // удаляем карточки
    }

    cardImage.addEventListener('click', onImageClick);


    //Проверка состояния лайка
    if (userLiked === true) {
        cardLikeButton.classList.add('card__like-button_is-active');
      }
    
      cardLikeButton.addEventListener('click', () => {
        like(cardLikeButton, cardData._id, likeCount);
      })
    

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
    likeCardOnAPI(cardId, isLiked)
        .then(data => {
            cardLikeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = data.likes.length;
        })
        .catch(error => console.log(error))
    }

// const haveLike = (like) => {
//     return like.classList.contains('card__like-button_is-active');
// }

// const updateLike = (button, count) => {
//     button.classList.toggle('card__like-button_is-active');
//     button.nextElementSibling.textContent = count.likes.length;
// }

// const like = (btn, cardId) => {
//     if(haveLike(btn)) {
//     deleteLikeOnAPI(cardId)
//       .then((data) => {
//         updateLike(btn, data);
//       })
//       .catch((err) => console.log(err));
//     } else {
//     likeCardOnAPI(cardId)
//       .then((data) => {
//         updateLike(btn, data);
//       })
//       .catch((err) => console.log(err));
//     }
//   };

export { createCard, deleteCard, like};