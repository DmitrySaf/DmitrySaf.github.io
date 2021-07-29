import './dropdown.sass';
import 'inputmask/dist/jquery.inputmask.min';

//maskedInput

$('#input__date').inputmask({
    mask: "99.99.9999",
    placeholder: "ДД.ММ.ГГГГ",});


    // dropdown

const clearButton = $('.dropdown__button_clear'),
      placeholderText = $('.dropdown__placeholder'),
      counter = $('.dropdown__operation_counter'),
      dropdown = $('.dropdown'),
      acceptButton = $('.dropdown__button_accept'),
      dropdownContent = $('.dropdown__content_wrapper');

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

function calcButtonStyleChange(buttonLink, opacity, cursor){
    buttonLink.style.opacity = opacity;
    buttonLink.style.cursor = cursor;
}

$('#dropdown-guests').on('click', () => {
    dropdownContent.toggleClass('show');
    dropdown.toggleClass('border-radius_none');
    counter.each((i, item) => {
        if(item.textContent == 0){
            calcButtonStyleChange(item.previousElementSibling, '.5', 'default');
        }
    });
});

clearButton.on('click', () => {
    placeholderText.text(`Сколько гостей`);
    counter.text(0);
    counter.each((i, item) => {
        if(item.textContent == 0){
            calcButtonStyleChange(item.previousElementSibling, '.5', 'default');
        }
    });
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
    let counter = e.currentTarget.previousElementSibling;
    counter.textContent++;
    calcButtonStyleChange(counter.previousElementSibling, '1', 'pointer');
    guestEndings(sumGuests);
});

counter.prev().on('click', (e) => {
    let counter = e.currentTarget.nextElementSibling;
    if(counter.textContent > 0)
        counter.textContent--;
        if(counter.textContent == 0){
            calcButtonStyleChange(e.currentTarget, '.5', 'default');
        }
    guestEndings(sumGuests);
});

