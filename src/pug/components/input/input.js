import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';
import 'inputmask/dist/jquery.inputmask.min';

import './input.sass';

const $inputsToMask = $('.js-input_size_s, .card-registration__input_date');
const $inputArrival = $('#input__date_arrival');
const $inputDeparture = $('#input__date_departure');
const $inputArrivalArrow = $('#input__date_arrival').next();
const $inputDepartureArrow = $('#input__date_departure').next();
const $inputFilter = $('#input__date_filter');
const $inputFilterArrow = $('#input__date_filter').next();
const $datepickerArrival = $inputArrival.datepicker().data('datepicker');
const $datepickerFilter = $inputFilter.datepicker().data('datepicker');
const inputArrivalDepartureArray = [$inputArrival, $inputDeparture, $inputDepartureArrow, $inputArrivalArrow];
const inputFilterArray = [$inputFilter, $inputFilterArrow];

$inputsToMask.inputmask({
    mask: "99.99.9999",
    placeholder: "ДД.ММ.ГГГГ"
});

inputArrivalDepartureArray.forEach(item => {
    item.on('click', () => {
        $datepickerArrival.show();
        if ($('.datepicker--button').length === 1){
            $('.datepicker--buttons').append('<div class="datepicker--button datepicker-accept">Применить</div>');
            $('.datepicker-accept').on('click', () => {
                $datepickerArrival.hide();
            });
        }
    });
});

$inputArrival.datepicker({
    prevHtml: '<div class="datepicker--nav-action_prev"></div>',
    nextHtml: '<div class="datepicker--nav-action_next"></div>',
    navTitles: {
        days: 'MM <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },
    moveToOtherYearsOnSelect: false,
    autoClose: true,
    minDate: new Date(),
    onSelect: (formattedDate, date) => {
        $inputArrival.val(formattedDate.split(',')[0]);
        $inputDeparture.val(formattedDate.split(',')[1]);
        localStorage.setItem('firstDate', date[0]);
        localStorage.setItem('secondDate', date[1]);
    },
    multipleDates: 2,
    range: true,
    clearButton: true,
});

if ($(window)[0].document.title === 'Search rooms') {
    inputFilterArray.forEach(item => {
        item.on('click', () => {
            $datepickerFilter.show();
            if ($('.datepicker--button').length === 1){
                $('.datepicker--buttons').append('<div class="datepicker--button datepicker-accept">Применить</div>');
                $('.datepicker-accept').on('click', () => {
                    $datepickerFilter.hide();
                });
            }
        });
    });
    $inputFilter.datepicker({
        dateFormat: 'dd M',
        multipleDates: 2,
        multipleDatesSeparator: ' - ',
        range: true,
        clearButton: true,
        moveToOtherYearsOnSelect: false,
        minDate: new Date(),
        prevHtml: '<div class="datepicker--nav-action_prev"></div>',
        nextHtml: '<div class="datepicker--nav-action_next"></div>',
        navTitles: {
            days: 'MM <i>yyyy</i>',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
        }
    });
    $datepickerFilter.selectedDates = [
        new Date(localStorage.getItem('firstDate')), 
        new Date(localStorage.getItem('secondDate'))
    ]; 
    $datepickerFilter.update();
    $inputFilterArrow.on('click', () => {
        let param = $('.-selected-').first().next();
        $('.-selected-').first().addClass('-range-from-');
        while (!param.hasClass('-selected-')) {
            param.addClass('-in-range-');
            param = param.next();
        }
        param.addClass('-range-to-');
    });
}









