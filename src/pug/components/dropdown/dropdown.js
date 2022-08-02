import './dropdown.sass';

const clearButton = $('.dropdown__button_clear'),
      acceptButton = $('.dropdown__button_accept'),
      placeholderText = $('.dropdown__placeholder'),
      counterAll = $('.dropdown__operation_counter'),
      counterGuestsDefault = $('.dropdown__counter_guests'),
      counterGuestsMedium = $('.dropdown__counter_guests_medium'),
      counterRooms = $('.dropdown__counter_rooms'),
      arrow = $('.arrow__dropdown'),
      dropdown = $('.dropdown');

function sumGuests(counter){
    let sum = 0;
    counter.each((i, item) => {
        sum += item.textContent;
    });
    return sum;
}

function guestEndings(counter){
    let sumGuests = (+counter[0].textContent) + (+counter[1].textContent);
    let babies = +counter[2].textContent;
    let outputText = [];

    if ((sumGuests % 10 == 1) && (sumGuests != 11)) {
        outputText.push(`${sumGuests} гость`);
    } else if (((sumGuests % 10 == 2) || (sumGuests % 10 == 3) || (sumGuests % 10 == 4)) && (sumGuests != 12) && (sumGuests != 13) && (sumGuests != 14)) {
        outputText.push(`${sumGuests} гостя`);
    } else if (sumGuests == 0) {
        outputText.push(`Сколько гостей`);
    } else {
        outputText.push(`${sumGuests} гостей`);
    }

    if ((babies % 10 == 1) && (babies != 11)) {
        outputText.push(`${babies} младенец`);
    } else if (((babies % 10 == 2) || (babies % 10 == 3) || (babies % 10 == 4)) && (babies != 12) && (babies != 13) && (babies != 14)) {
        outputText.push(`${babies} младенца`);
    } else if (babies == 0) {
        outputText.push(``);
        return outputText.join('');
    } else {
        outputText.push(`${babies} младенцев`);
    }
    return outputText.join(', ');
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

arrow.on('click', (e) => {
    e.currentTarget.parentElement.classList.toggle('border-radius_none');
    
    if (e.currentTarget.parentElement.id == 'dropdown-rooms') {
        counterRooms[0].textContent = '2';
        counterRooms[1].textContent = '2';
        counterRooms.each((i, item) => {
            if (item.textContent > '0')
                item.previousElementSibling.classList.remove('disabled');
        });
    }

    if (e.currentTarget.parentElement.id == 'dropdown-guests_medium') {
        counterGuestsMedium.each((i, item) => {
            if (+item.textContent > 0)
                item.previousElementSibling.classList.remove('disabled');
        });
    }
});

if ($(window)[0].document.title === 'Search rooms') {
    counterGuestsMedium.each((i, item) => {
        item.textContent = localStorage.getItem('guests')[i];
    });
    $('#dropdown-guests_medium > .dropdown__placeholder').text(guestEndings(counterGuestsMedium));
}

clearButton.on('click', () => {
    counterGuestsDefault.text(0);
    placeholderText[0].textContent = guestEndings(counterGuestsDefault);
    clearButton.removeClass('show');
    $('.dropdown__operation_minus').addClass('disabled');
});

acceptButton.on('click', () => {
    localStorage.setItem('guests', counterGuestsDefault.text().split());
    arrow.prop('checked', false);
    dropdown.toggleClass('border-radius_none');
});

counterAll.next().on('click', (e) => {
    let counter = e.currentTarget.previousElementSibling,
        placeholder = e.currentTarget.offsetParent.previousElementSibling.previousElementSibling;

    counter.textContent++;
    counter.previousElementSibling.classList.remove('disabled');

    if (counter.classList.contains('dropdown__counter_guests')) {
        placeholder.textContent = guestEndings(counterGuestsDefault);
    } else if (counter.classList.contains('dropdown__counter_guests_medium')) {
        placeholder.textContent = guestEndings(counterGuestsMedium);
    } if (counter.classList.contains('dropdown__counter_rooms')) {
        placeholder.textContent = roomsEndings(counterRooms);
    }

    if (sumGuests(counterGuestsDefault) > 0) {
        clearButton.addClass('show');
    }
});

counterAll.prev().on('click', (e) => {
    let counter = e.currentTarget.nextElementSibling,
        placeholder = e.currentTarget.offsetParent.previousElementSibling.previousElementSibling;

    if(counter.textContent > 0)
        counter.textContent--;
        if(counter.textContent == 0){
            e.currentTarget.classList.add('disabled');
        }

    if (counter.classList.contains('dropdown__counter_guests')) {
        placeholder.textContent = guestEndings(counterGuestsDefault);
    } else if (counter.classList.contains('dropdown__counter_guests_medium')) {
        placeholder.textContent = guestEndings(counterGuestsMedium);
    } if (counter.classList.contains('dropdown__counter_rooms')) {
        placeholder.textContent = roomsEndings(counterRooms);
    }
    if (sumGuests(counterGuestsDefault) == 0) {
        clearButton.removeClass('show');
    }
});