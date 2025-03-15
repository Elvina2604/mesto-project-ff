const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
    headers: {
        authorization: '7c100fb2-bcdb-4574-bc53-d21da6819963',
        'Content-Type': 'application/json',
      },
};

//Проверяем JSON формат
const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

//Загрузка данных пользователя
const getInformationUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
}).then(handleResponse);
}

//Загрузка массива карточек
const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
}).then(handleResponse);
}

// Добавление новой карточки
const addNewCardApi = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then(handleResponse);
}

// Редактирование профиля
const editInformationUser = (userName, userDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method:'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userDescription
        })
    }).then(handleResponse);
}

// Удаление созданных нами карточек
const deleteCardOnAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(handleResponse);
}

// Отображение количества лайков карточки
// Постанова и снятие лайк
const likeCardOnAPI = (cardId, isLiked) => {
    const method = isLiked ? 'DELETE' : 'PUT'

	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method,
		headers: config.headers,
    }).then(handleResponse);
}

// // // Снять лайк
// const deleteLikeOnAPI = (cardId) => {
//     return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//         method: 'DELETE',
//         headers: config.headers,
//     }).then(handleResponse);
// }

// Обновление аватара пользователя
const editAvatarUser = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method:'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        })
    })
}

export {getInformationUser, getCards, addNewCardApi, likeCardOnAPI, deleteCardOnAPI, editAvatarUser, editInformationUser};