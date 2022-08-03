import './dropdown.sass';

const $clearButton = $('.js-dropdown__button_clear');
const $acceptButton = $('.js-dropdown__button_accept');
const $placeholderText = $('.js-dropdown__placeholder');
const $operationPlus = $('.js-dropdown__operation_plus');
const $counterGuestsDefault = $('.js-dropdown__counter_guests');
const $counterGuestsMedium = $('.js-dropdown__counter_guests_medium');
const $counterRooms = $('.js-dropdown__counter_rooms');
const $arrow = $('.js-arrow__dropdown');
const $dropdown = $('.js-dropdown');
const $operationMinus = $('.js-dropdown__operation_minus');

const sumGuests = (counter) =>{
    let sum = 0;
    counter.each((i, item) => {
        sum += +item.textContent;
    });
    return sum;
}

function guestEndings(counter){
    const sumGuests = (+counter[0].textContent) + (+counter[1].textContent);
    const babies = +counter[2].textContent;
    let outputText = [];

    if ((sumGuests % 10 == 1) && (sumGuests != 11)) {
        outputText.push(`${sumGuests} гость`);
    } else if (((sumGuests % 10 == 2) || (sumGuests % 10 == 3) || (sumGuests % 10 == 4)) && (sumGuests != 12) && (sumGuests != 13) && (sumGuests != 14)) {
        outputText.push(`${sumGuests} гостя`);
    } else if (sumGuests == 0) {
        outputText.push('Сколько гостей');
    } else {
        outputText.push(`${sumGuests} гостей`);
    }

    if ((babies % 10 == 1) && (babies != 11)) {
        outputText.push(`${babies} младенец`);
    } else if (((babies % 10 == 2) || (babies % 10 == 3) || (babies % 10 == 4)) && (babies != 12) && (babies != 13) && (babies != 14)) {
        outputText.push(`${babies} младенца`);
    } else if (babies == 0) {
        outputText.push('');
        return outputText.join('');
    } else {
        outputText.push(`${babies} младенцев`);
    }
    return outputText.join(', ');
}

function roomsEndings(counter){
    const bedrooms = counter[0].textContent;
    const beds = counter[1].textContent;
    let outputText = [];

    if ((bedrooms % 10 == 1) && (bedrooms != 11)) {
        outputText.push(`${bedrooms} спальня`);
    } else if (((bedrooms % 10 == 2) || (bedrooms % 10 == 3) || (bedrooms % 10 == 4)) && (bedrooms != 12) && (bedrooms != 13) && (bedrooms != 14)) {
        outputText.push(`${bedrooms} спальни`)  ;
    } else if (bedrooms == 0) {
        outputText.push('2 спальни');
    } else {
        outputText.push(`${bedrooms} спален`);
    }

    if ((beds % 10 == 1) && (beds != 11)) {
        outputText.push(`${beds} кровать...`);
    } else if (((beds % 10 == 2) || (beds % 10 == 3) || (beds % 10 == 4)) && (beds != 12) && (beds != 13) && (beds != 14)) {
        outputText.push(`${beds} кровати...`);
    } else if (beds == 0) {
        outputText.push('2 кровати...');
    } else {
        outputText.push(`${beds} кроватей...`);
    }
    return outputText.join(', ');
}

$arrow.on('click', (e) => {
    const $dropdownLocal = $(e.currentTarget.parentElement);
    $dropdownLocal.toggleClass('border-radius_none');

    if ($dropdownLocal.attr('id') === 'dropdown-rooms') {
        $counterRooms[0].textContent = '2';
        $counterRooms[1].textContent = '2';
        $counterRooms.each((i, item) => {
            if (+item.textContent > 0)
                item.previousElementSibling.classList.remove('disabled');
        });
    }

    if ($dropdownLocal.attr('id') == 'dropdown-guests_medium') {
        $counterGuestsMedium.each((i, item) => {
            if (+item.textContent > 0)
                item.previousElementSibling.classList.remove('disabled');
        });
    }
});

if ($(window)[0].document.title === 'Search rooms') {
    $counterGuestsMedium.each((i, item) => {
        item.textContent = localStorage.getItem('guests')[i];
    });
    $('#dropdown-guests_medium > .dropdown__placeholder').text(guestEndings($counterGuestsMedium));
}

$clearButton.on('click', () => {
    $counterGuestsDefault.text(0);
    $placeholderText.text(guestEndings($counterGuestsDefault));
    $clearButton.removeClass('show');
    $operationMinus.addClass('disabled');
});

$acceptButton.on('click', () => {
    localStorage.setItem('guests', $counterGuestsDefault.text().split());
    $arrow.prop('checked', false);
    $dropdown.toggleClass('border-radius_none');
});

$operationPlus.on('click', (e) => {
    const $plus = $(e.currentTarget);
    const $counter = $plus.prev();
    const $placeholder = $plus.offsetParent().parent().find('.js-dropdown__placeholder');
    const $minus = $plus.prev().prev();
    const $counterVal = +$counter.text();

    $counter.text($counterVal + 1);
    $minus.removeClass('disabled');

    if ($counter.hasClass('dropdown__counter_guests')) {
        $placeholder.text(guestEndings($counterGuestsDefault));
    } 
    if ($counter.hasClass('dropdown__counter_guests_medium')) {
        $placeholder.text(guestEndings($counterGuestsMedium));
    } 
    if ($counter.hasClass('dropdown__counter_rooms')) {
        $placeholder.text(roomsEndings($counterRooms));
    }
    if (sumGuests($counterGuestsDefault) > 0) {
        $clearButton.addClass('show');
    }
});

$operationMinus.on('click', (e) => {
    const $minus = $(e.currentTarget);
    const $counter = $minus.next();
    const $placeholder = $minus.offsetParent().parent().find('.js-dropdown__placeholder');
    const $counterVal = +$counter.text();

    if (!$minus.hasClass('disabled')) {
        $counter.text($counterVal - 1);
    }
    if ($counterVal <= 1) {
        $minus.addClass('disabled');
    }
    if ($counter.hasClass('dropdown__counter_guests')) {
        $placeholder.text(guestEndings($counterGuestsDefault));
    }
    if ($counter.hasClass('dropdown__counter_guests_medium')) {
        $placeholder.text(guestEndings($counterGuestsMedium));
    } 
    if ($counter.hasClass('dropdown__counter_rooms')) {
        $placeholder.text(roomsEndings($counterRooms));
    }
    console.log(sumGuests($counterGuestsDefault));
    if (sumGuests($counterGuestsDefault) === 0) {
        $clearButton.removeClass('show');
    }
});