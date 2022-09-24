import 'inputmask/dist/jquery.inputmask.min';

const $inputsToMask = $('.js-input_masked');

$inputsToMask.inputmask({
  mask: '99.99.9999',
  placeholder: 'ДД.ММ.ГГГГ',
});