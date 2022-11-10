const $dropdownCheckboxArrow = $('.js-dropdown-checkbox__arrow');
const $dropdownCheckboxContent = $('.dropdown-checkbox__list');

const onDropdownClose = (e) => {
  const isCLosest = e.target.closest('.dropdown-checkbox__list');

  if (!isCLosest && $dropdownCheckboxArrow.hasClass('dropdown-checkbox__arrow_triggered')) {
    $dropdownCheckboxContent.css('height', '0px');
    $dropdownCheckboxArrow.removeClass('dropdown-checkbox__arrow_triggered');
    document.removeEventListener('click', onDropdownClose);
    return;
  }
  if (!$dropdownCheckboxArrow.hasClass('dropdown-checkbox__arrow_triggered')) {
    $dropdownCheckboxContent.css('height', `${$dropdownCheckboxContent.children().length * 30}px`);
    $dropdownCheckboxArrow.addClass('dropdown-checkbox__arrow_triggered');
  }
};

$dropdownCheckboxArrow.on('click', (e) => {
  e.stopPropagation();

  document.addEventListener('click', onDropdownClose);
  onDropdownClose(e);
});
