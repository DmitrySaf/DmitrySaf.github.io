const $clearButton = $('.js-dropdown__button_clear');
const $acceptButton = $('.js-dropdown__button_accept');
const $operationPlus = $('.js-dropdown__operation_plus');
const $operationMinus = $('.js-dropdown__operation_minus');
const $arrow = $('.js-dropdown__arrow');

let guestsCounterValues = [0, 0, 0];
let roomsCounterValues = [2, 2, 0];

const guestEndings = () => {
  const guests = guestsCounterValues[0] + guestsCounterValues[1];
  const babies = guestsCounterValues[2];
  const outputText = [];

  if ((guests % 10 === 1) && (guests !== 11)) {
    outputText.push(`${guests} гость`);
  } else if (((guests % 10 === 2)
      || (guests % 10 === 3)
      || (guests % 10 === 4))
      && (guests !== 12)
      && (guests !== 13)
      && (guests !== 14)) {
    outputText.push(`${guests} гостя`);
  } else if (guests === 0) {
    outputText.push('Сколько гостей');
  } else {
    outputText.push(`${guests} гостей`);
  }

  if ((babies % 10 === 1) && (babies !== 11)) {
    outputText.push(`${babies} младенец`);
  } else if (((babies % 10 === 2)
      || (babies % 10 === 3)
      || (babies % 10 === 4))
      && (babies !== 12)
      && (babies !== 13)
      && (babies !== 14)) {
    outputText.push(`${babies} младенца`);
  } else if (babies === 0) {
    outputText.push('');
    return outputText.join('');
  } else {
    outputText.push(`${babies} младенцев`);
  }
  return outputText.join(', ');
}

const roomsEndings = () => {
  const bedrooms = roomsCounterValues[0];
  const beds = roomsCounterValues[1];
  const outputText = [];

  if ((bedrooms % 10 === 1) && (bedrooms !== 11)) {
    outputText.push(`${bedrooms} спальня`);
  } else if (((bedrooms % 10 === 2)
      || (bedrooms % 10 === 3)
      || (bedrooms % 10 === 4))
      && (bedrooms !== 12)
      && (bedrooms !== 13)
      && (bedrooms !== 14)) {
    outputText.push(`${bedrooms} спальни`);
  } else if (bedrooms === 0) {
    outputText.push('2 спальни');
  } else {
    outputText.push(`${bedrooms} спален`);
  }

  if ((beds % 10 === 1) && (beds !== 11)) {
    outputText.push(`${beds} кровать...`);
  } else if (((beds % 10 === 2)
      || (beds % 10 === 3)
      || (beds % 10 === 4))
      && (beds !== 12)
      && (beds !== 13)
      && (beds !== 14)) {
    outputText.push(`${beds} кровати...`);
  } else if (beds === 0) {
    outputText.push('2 кровати...');
  } else {
    outputText.push(`${beds} кроватей...`);
  }
  return outputText.join(', ');
}

const renderCounter = (dropdown) => {
  const $placeholder = dropdown.find('.js-dropdown__placeholder');

  if (dropdown.attr('id') === 'dropdown-rooms') {
    dropdown.find('.dropdown__operation-counter').each((i, item) => {
      if (roomsCounterValues[i] === 0) {
        item.previousElementSibling.classList.add('operation_disabled')
      }
      item.textContent = roomsCounterValues[i];
    })
    $placeholder.text(roomsEndings())
  } else {
    dropdown.find('.dropdown__operation-counter').each((i, item) => {
      if (guestsCounterValues[i] === 0) {
        item.previousElementSibling.classList.add('operation_disabled')
      }
      item.textContent = guestsCounterValues[i]
    })
    $placeholder.text(guestEndings())
  }
}

const openDropdown = (e) => {
  const $dropdown = $(e.currentTarget.parentElement);

  $dropdown.toggleClass('dropdown_border-radius_none');
  renderCounter($dropdown);
}

if ($(window)[0].document.title === 'Search rooms') {
  const $dropdown = $('#dropdown-guests');

  guestsCounterValues = JSON.parse(localStorage.getItem('guests'));
  renderCounter($dropdown);
}

$arrow.on('click', openDropdown);

$clearButton.on('click', (e) => {
  const $dropdown = $(e.currentTarget).offsetParent().offsetParent().offsetParent();

  guestsCounterValues.forEach((item, i) => guestsCounterValues[i] = 0);
  renderCounter($dropdown);
  $clearButton.removeClass('clear-button_shown');
});

$acceptButton.on('click', (e) => {
  const $dropdown = $(e.currentTarget).offsetParent().offsetParent().offsetParent();

  localStorage.setItem('guests', JSON.stringify(guestsCounterValues));
  $arrow.prop('checked', false);
  $dropdown.toggleClass('border-radius_none');
});

$operationPlus.on('click', (e) => {
  const $plus = $(e.currentTarget);
  const $dropdown = $plus.offsetParent().parent();
  const indexOfChange = $operationPlus.index(e.currentTarget);

  ($dropdown.attr('id') === 'dropdown-rooms') 
    ? roomsCounterValues[indexOfChange] += 1 
    : guestsCounterValues[indexOfChange] += 1;
  renderCounter($dropdown);
  $clearButton.addClass('clear-button_shown');
});

$operationMinus.on('click', (e) => {
  const $minus = $(e.currentTarget);
  const $dropdown = $minus.offsetParent().parent();
  const indexOfChange = $operationMinus.index(e.currentTarget);

  if ($dropdown.attr('id') === 'dropdown-rooms') {
    roomsCounterValues[indexOfChange] -= 1;
    if (roomsCounterValues.map(item => item += item) === 0) $clearButton.removeClass('clear-button_shown');
  } else {
    guestsCounterValues[indexOfChange] -= 1;
    if (guestsCounterValues.map(item => item += item) === 0) $clearButton.removeClass('clear-button_shown');
  }
  renderCounter($dropdown);
});
