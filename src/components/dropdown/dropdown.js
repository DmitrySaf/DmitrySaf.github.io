class Dropdown {
  constructor(dropdown) {
    this.$dropdown = $(dropdown);
    this.$clearButton = $(dropdown).find('.js-dropdown__button_clear');
    this.$acceptButton = $(dropdown).find('.js-dropdown__button_accept');
    this.$operationPlus = $(dropdown).find('.js-dropdown__operation_plus');
    this.$operationMinus = $(dropdown).find('.js-dropdown__operation_minus');
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
  }

  onDropdownOpen = (e) => {
    this.$dropdown.addClass('dropdown_border-radius_none');
    this.renderCounter();
    e.currentTarget.addEventListener('blur', this.onDropdownClose);
  }

  onDropdownClose = (e) => {
    this.$dropdown.removeClass('dropdown_border-radius_none');
    e.currentTarget.removeEventListener('blur', this.onDropdownClose);
  }

  onClearButton = () => {
    this.counterValues = [0, 0, 0];
    this.renderCounter(this.$dropdown);
    this.$clearButton.removeClass('clear-button_shown');
  }

  onAcceptButton = () => {
    localStorage.setItem('guests', JSON.stringify(this.counterValues));
    this.$arrow.prop('checked', false);
    this.$dropdown.toggleClass('border-radius_none');
  }

  onIncrease = (e) => {
    const indexOfChange = this.$operationPlus.index(e.currentTarget);
  
    this.counterValues[indexOfChange] += 1;
    this.renderCounter();
    this.$clearButton.addClass('clear-button_shown');
  }

  onDecrease = (e) => {
    const indexOfChange = this.$operationMinus.index(e.currentTarget);
    const currentCounter = this.counterValues[indexOfChange];
    
    if (currentCounter > 0) {
      this.counterValues[indexOfChange] -= 1;
      if (this.counterValues.reduce((acc, curr) => acc+curr) === 0) this.$clearButton.removeClass('clear-button_shown');
      this.renderCounter();
    }
  }

  renderCounter = () => {
    const placeholderText = this.isGuests ? this.guestEndings() : this.roomsEndings();

    this.$counter.each((i, item) => {
      if (this.counterValues[i] <= 0) {
        item.previousElementSibling.classList.add('operation_disabled');
      } else {
        item.previousElementSibling.classList.remove('operation_disabled');
      }
      item.textContent = this.counterValues[i];
    });
    this.$placeholder.text(placeholderText);
  }

  guestEndings = () => {
    const guests = this.counterValues[0] + this.counterValues[1];
    const babies = this.counterValues[2];
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

  roomsEndings = () => {
    const bedrooms = this.counterValues[0];
    const beds = this.counterValues[1];
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
}

export default Dropdown;
