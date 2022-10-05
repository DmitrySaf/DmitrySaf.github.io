const endingsCheck = (endings) => {
  const {
    ones, twoToFour, others, value,
  } = endings;
  const endsWithTwoToFour = ((value % 10 === 2)
    || (value % 10 === 3)
    || (value % 10 === 4))
    && (value !== 12)
    && (value !== 13)
    && (value !== 14);
  const endsWithOne = (value % 10 === 1) && (value !== 11);

  if (endsWithOne) return (`${value} ${ones}`);
  if (endsWithTwoToFour) return (`${value} ${twoToFour}`);
  return (`${value} ${others}`);
};

class Dropdown {
  constructor(dropdown) {
    this.$dropdown = $(dropdown);
    this.$clearButton = $(dropdown).find('.js-dropdown__button_action_clear');
    this.$acceptButton = $(dropdown).find('.js-dropdown__button_action_accept');
    this.$operationPlus = $(dropdown).find('.js-dropdown__operation_type_plus');
    this.$operationMinus = $(dropdown).find('.js-dropdown__operation_type_minus');
    this.$placeholder = $(dropdown).find('.js-dropdown__placeholder');
    this.$arrow = $(dropdown).find('.js-dropdown__arrow');
    this.$counter = $(dropdown).find('.dropdown__operation-counter');
    this.isGuests = this.$dropdown.attr('id') === 'dropdown-guests';
    this.dataInStorage = localStorage.getItem('guests') ? JSON.parse(localStorage.getItem('guests')) : [0, 0, 0];
    this.counterValues = this.isGuests ? this.dataInStorage : [2, 2, 0];
    this.renderCounter();
    this.addEventListeners();
  }

  addEventListeners = () => {
    this.$arrow.on('click', this.onDropdownOpen);
    this.$clearButton.on('click', this.onClearButton);
    this.$acceptButton.on('click', this.onAcceptButton);
    this.$operationMinus.on('click', this.onDecrease);
    this.$operationPlus.on('click', this.onIncrease);
  };

  onDropdownOpen = (e) => {
    e.stopPropagation();
    this.$dropdown.addClass('dropdown_shown');
    this.renderCounter();
    document.addEventListener('click', this.onDropdownClose);
  };

  onDropdownClose = (e) => {
    const isCLosest = e.target.closest('.dropdown__content-wrapper');

    if (!isCLosest && this.$dropdown.hasClass('dropdown_shown')) {
      this.$dropdown.removeClass('dropdown_shown');
    }
  };

  onClearButton = () => {
    this.counterValues = [0, 0, 0];
    this.renderCounter(this.$dropdown);
    this.$clearButton.removeClass('clear-button_shown');
  };

  onAcceptButton = () => {
    localStorage.setItem('guests', JSON.stringify(this.counterValues));
    this.$dropdown.removeClass('dropdown_shown');
  };

  onIncrease = (e) => {
    const indexOfChange = this.$operationPlus.index(e.currentTarget);

    this.counterValues[indexOfChange] += 1;
    this.renderCounter();
    this.$clearButton.addClass('clear-button_shown');
  };

  onDecrease = (e) => {
    const indexOfChange = this.$operationMinus.index(e.currentTarget);
    const currentCounter = this.counterValues[indexOfChange];

    if (currentCounter > 0) {
      this.counterValues[indexOfChange] -= 1;
      if (this.counterValues.reduce((acc, curr) => acc + curr) === 0) this.$clearButton.removeClass('clear-button_shown');
      this.renderCounter();
    }
  };

  renderCounter = () => {
    const placeholderText = this.isGuests ? this.guestEndings() : this.roomsEndings();

    this.$counter.each((i, item) => {
      if (this.counterValues[i] <= 0) {
        item.previousElementSibling.classList.add('operation_disabled');
      } else {
        item.previousElementSibling.classList.remove('operation_disabled');
      }
      this.$counter[i].textContent = this.counterValues[i];
    });
    if (this.counterValues.reduce((acc, curr) => acc + curr) > 0) this.$clearButton.addClass('clear-button_shown');
    this.$placeholder.text(placeholderText);
  };

  guestEndings = () => {
    const gusetsEndings = {
      value: this.counterValues[0] + this.counterValues[1],
      ones: 'гость',
      twoToFour: 'гостя',
      others: 'гостей',
    };
    const babiesEndings = {
      value: this.counterValues[2],
      ones: 'младенец',
      twoToFour: 'младенца',
      others: 'младенцев',
    };
    const outputText = [
      endingsCheck(gusetsEndings),
    ];

    if (this.counterValues[2] !== 0) outputText.push(endingsCheck(babiesEndings));

    return (this.counterValues.reduce((acc, curr) => acc + curr) === 0)
      ? 'Сколько гостей'
      : outputText.join(', ');
  };

  roomsEndings = () => {
    const bedroomsEndings = {
      value: this.counterValues[0],
      ones: 'спалья',
      twoToFour: 'спальни',
      others: 'спален',
    };
    const bedsEndings = {
      value: this.counterValues[1],
      ones: 'кровать',
      twoToFour: 'кровати',
      others: 'кроватей',
    };
    const bathsEndings = {
      value: this.counterValues[2],
      ones: 'ванная',
      twoToFour: 'ванны',
      others: 'ванн',
    };
    const outputText = [
      endingsCheck(bedroomsEndings),
      endingsCheck(bedsEndings),
      endingsCheck(bathsEndings),
    ];

    return outputText.join(', ');
  };
}

export default Dropdown;
