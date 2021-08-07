import './dropdown.sass';

// dropdown

const clearButton = $('.dropdown__button_clear'),
      acceptButton = $('.dropdown__button_accept'),
      placeholderText = $('.dropdown__placeholder'),
      counter = $('.dropdown__operation_counter'),
      counterGuestsDefault = $('.dropdown__counter_guests'),
      counterGuestsMedium = $('.dropdown__counter_guests_medium'),
      counterRooms = $('.dropdown__counter_rooms_medium'),
      dropdown = $('.dropdown'),
      dropdownArrow = $('.dropdown').next(),
      dropdownContent = $('.dropdown__content_wrapper');



function sumGuests(targetCounter){
    let guests = 0;
    targetCounter.each((i, item) => {
        guests += +item.textContent;
    });
    return guests;
}

function guestEndings(guests, counter){
    if ((guests(counter) % 10 == 1) && (guests(counter) != 11)) {
        return `${guests(counter)} гость`;
    } else if (((guests(counter) % 10 == 2) || (guests(counter) % 10 == 3) || (guests(counter) % 10 == 4)) && (guests(counter) != 12) && (guests(counter) != 13) && (guests(counter) != 14)) {
        return `${guests(counter)} гостя`  ;
    } else if (guests(counter) == 0) {
        return `Сколько гостей`;
    } else {
        return `${guests(counter)} гостей`;
    }
}

function roomsEndings(counter){
    let bedrooms = counter[0].textContent,
        beds = counter[1].textContent;
    let outputText = [];

    if ((bedrooms % 10 == 1) && (bedrooms != 11)) {
        outputText.push(`${bedrooms} спальня`);
    } else if (((bedrooms % 10 == 2) || (bedrooms % 10 == 3) || (bedrooms % 10 == 4)) && (bedrooms != 12) && (bedrooms != 13) && (bedrooms != 14)) {
        outputText.push(`${bedrooms} спальни`)  ;
    } else if (bedrooms == 0) {
        outputText.push(`2 спальни`);
    } else {
        outputText.push(`${bedrooms} спален`);
    }

    if ((beds % 10 == 1) && (beds != 11)) {
        outputText.push(`${beds} кровать...`);
    } else if (((beds % 10 == 2) || (beds % 10 == 3) || (beds % 10 == 4)) && (beds != 12) && (beds != 13) && (beds != 14)) {
        outputText.push(`${beds} кровати...`);
    } else if (beds == 0) {
        outputText.push(`2 кровати...`);
    } else {
        outputText.push(`${beds} кроватей...`);
    }

    return outputText.join(', ');
}

function toggleContent(e){
    if (e.target == e.currentTarget || e.target == e.currentTarget.firstElementChild) {
        e.currentTarget.lastChild.classList.toggle('show');
        e.currentTarget.classList.toggle('border-radius_none');
    }
}

dropdown.on('click', (e) => {
    toggleContent(e);
    counter.each((i, item) => {
        if(item.textContent == 0)
            item.previousElementSibling.classList.add('disabled');
    });
});

dropdownArrow.on('click', (e) => {
    let dropdownLocal = e.currentTarget.previousElementSibling;
    dropdownLocal.lastChild.classList.toggle('show');
    dropdownLocal.classList.toggle('border-radius_none');
    counter.each((i, item) => {
        if(item.textContent == 0)
            item.previousElementSibling.classList.add('disabled');
    });
});

clearButton.on('click', (e) => {
    placeholderText.text(`Сколько гостей`);
    counterGuestsDefault.text(0);
    if(sumGuests(counterGuestsDefault) == 0) {
        clearButton.toggleClass('show');
    }
});

acceptButton.on('click', (e) => {
    dropdown.attr('value', `${sumGuests(counterGuestsDefault)}`);
    dropdownContent.removeClass('show');
    dropdown.toggleClass('border-radius_none');
});

counter.next().on('click', (e) => {
    let counter = e.currentTarget.previousElementSibling,
        placeholder = e.currentTarget.offsetParent.previousElementSibling;

    counter.textContent++;
    counter.previousElementSibling.classList.remove('disabled');

    if (counter.classList.contains('dropdown__counter_guests')) {
        placeholder.textContent = guestEndings(sumGuests, counterGuestsDefault);
    } else if (counter.classList.contains('dropdown__counter_guests_medium')) {
        placeholder.textContent = guestEndings(sumGuests, counterGuestsMedium);
    } if (counter.classList.contains('dropdown__counter_rooms_medium')) {
        placeholder.textContent = roomsEndings(counterRooms);
    }

    if (sumGuests(counterGuestsDefault) > 0) {
        clearButton.addClass('show');
    }
});

counter.prev().on('click', (e) => {
    let counter = e.currentTarget.nextElementSibling,
        placeholder = e.currentTarget.offsetParent.previousElementSibling;

    if(counter.textContent > 0)
        counter.textContent--;
        if(counter.textContent == 0){
            e.currentTarget.classList.remove('disabled');
        }

    if (counter.classList.contains('dropdown__counter_guests')) {
        placeholder.textContent = guestEndings(sumGuests, counterGuestsDefault);
    } else if (counter.classList.contains('dropdown__counter_guests_medium')) {
        placeholder.textContent = guestEndings(sumGuests, counterGuestsMedium);
    } if (counter.classList.contains('dropdown__counter_rooms_medium')) {
        placeholder.textContent = roomsEndings(counterRooms);
    }
    if (sumGuests(counterGuestsDefault) == 0) {
        clearButton.removeClass('show');
    }
});