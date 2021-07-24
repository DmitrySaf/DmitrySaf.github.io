import './dropdown.sass';
import 'inputmask/dist/jquery.inputmask.min';

//maskedInput

$('#input-date').inputmask({
    mask: "99.99.9999",
    placeholder: "ДД.ММ.ГГГГ",});


    // dropdown

const clearButton = $('.dropdown-content_action-clear'),
      placeholderText = $('.dropdown-placeholder'),
      counter = $('.item-calc_counter'),
      dropdown = $('.dropdown-default'),
      acceptButton = $('.dropdown-content_action-accept'),
      dropdownContent = $('.dropdown-content_wrapper');

function sumGuests(){
    let guests = 0;
    counter.each((i, item) => {
        guests += +item.textContent;
    });
    return guests;
}

function guestEndings(guests){
    if ((guests() % 10 == 1) && (guests() != 11)) {
        placeholderText.text(`${guests()} гость`);
    } else if (((guests() % 10 == 2) || (guests() % 10 == 3) || (guests() % 10 == 4)) && (guests() != 12) && (guests() != 13) && (guests() != 14)) {
        placeholderText.text(`${guests()} гостя`);
    } else if (guests() == 0) {
        placeholderText.text(`Сколько гостей`);
    } else {
        placeholderText.text(`${guests()} гостей`);
    }
    if (guests() > 0){
        clearButton.css('display', 'block');
    } else {
        clearButton.css('display', 'none');
    }
}

$('.dropdown-arrow').on('click', () => {
    dropdownContent.toggleClass('show');
    dropdown.toggleClass('border-radius_none');
});

clearButton.on('click', () => {
    placeholderText.text(`Сколько гостей`);
    counter.text(0);
    if(sumGuests() == 0) {
        clearButton.css('display', 'none');
    }
});

acceptButton.on('click', () => {
    dropdown.attr('value', `${sumGuests()}`);
    dropdownContent.removeClass('show');
    dropdown.toggleClass('border-radius_none');
});

counter.next().on('click', (e) => {
    e.currentTarget.previousElementSibling.textContent++;
    guestEndings(sumGuests);
});

counter.prev().on('click', (e) => {
    if(e.currentTarget.nextElementSibling.textContent > 0)
        e.currentTarget.nextElementSibling.textContent--;
    guestEndings(sumGuests);
});
