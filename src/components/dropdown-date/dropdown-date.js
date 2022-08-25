import 'inputmask/dist/jquery.inputmask.min';

import './dropdown-date.sass';

const $dropdownDateMasked = $('.js-dropdown-date_masked');

$dropdownDateMasked.inputmask({
  mask: '99.99.9999',
  placeholder: 'ДД.ММ.ГГГГ',
});