// открытие модального окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closingByOverlay);
    document.addEventListener('keydown', closingByEsc);
}

//закрытие модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closingByOverlay);
    document.removeEventListener('keydown', closingByEsc);
}

//функция закрытия модального окна по Оверлею
function closingByOverlay(evt) {
    if(evt.target === evt.currentTarget){
        closeModal(evt.target);
    }
}

// функция закрытия модального окна по ESC
function closingByEsc (evt) {
    if(evt.key === 'Escape') {
        const popupIsOpened = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpened);
    }
}

export { openModal, closeModal};