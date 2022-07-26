import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';
import 'inputmask/dist/jquery.inputmask.min';

import './input.sass';

//maskedInput

$('#input__date').inputmask({
    mask: "99.99.9999",
    placeholder: "ДД.ММ.ГГГГ",});

//calendar

const inputArrival = $('#input__date_arrival'),
      inputDeparture = $('#input__date_departure'),
      inputArrivalArrow = $('#input__date_arrival').next(),
      inputDepartureArrow = $('#input__date_departure').next(),
      inputFilterArrow = $('#input__date_filter').next(),
      datepickerArrival = inputArrival.datepicker().data('datepicker'),
      inputFilter = $('#input__date_filter'),
      datepickerFilter = inputFilter.datepicker().data('datepicker');

//event listener for all inputs and dropdowns

const inputArrivalDepartureArray = [inputArrival, inputDeparture, inputDepartureArrow, inputArrivalArrow],
      inputFilterArray = [inputFilter, inputFilterArrow];

inputArrivalDepartureArray.forEach((item) => {
    item.on('click', (e) => {
        datepickerArrival.show();
        if ($('.datepicker--button').length === 1){
            $('.datepicker--buttons').append('<div class="datepicker--button datepicker-accept">Применить</div>');
            $('.datepicker-accept').on('click', () => {
                datepickerArrival.hide();
            });
        }
    });
});

inputFilterArray.forEach(item => {
    item.on('click', (e) => {
        datepickerFilter.show();
        if ($('.datepicker--button').length === 1){
            $('.datepicker--buttons').append('<div class="datepicker--button datepicker-accept">Применить</div>');
            $('.datepicker-accept').on('click', () => {
                datepickerFilter.hide();
            });
        }
    });
});

//datepicker for ui

$('.cards__datepicker').datepicker({
    prevHtml: '<div class="datepicker--nav-action_prev"></div>',
    nextHtml: '<div class="datepicker--nav-action_next"></div>',
    navTitles: {
        days: 'MM <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },
    moveToOtherYearsOnSelect: false,
    minDate: new Date(),
    multipleDates: 2,
    range: true,
    clearButton: true,
});

inputArrival.datepicker({
    prevHtml: '<div class="datepicker--nav-action_prev"></div>',
    nextHtml: '<div class="datepicker--nav-action_next"></div>',
    navTitles: {
        days: 'MM <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },
    moveToOtherYearsOnSelect: false,
    minDate: new Date(),
    onSelect: (formattedDate, date, inst) => {
        inputArrival.val(formattedDate.split(',')[0]);
        inputDeparture.val(formattedDate.split(',')[1]);
        localStorage.setItem('firstDate', date[0]);
        localStorage.setItem('secondDate', date[1]);
    },
    multipleDates: 2,
    range: true,
    clearButton: true,
});

inputFilter.datepicker({
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

//recieving date from another page

if ($(window)[0].document.title === 'Search rooms') {
    datepickerFilter.selectedDates = [new Date(localStorage.getItem('firstDate')), new Date(localStorage.getItem('secondDate'))]; 
    datepickerFilter.update();

    //styles for in range cells

    inputFilterArrow.on('click', () => {
        let param = $('.-selected-')[0].nextElementSibling;
        param.previousElementSibling.classList.add('-range-from-');
        while (!param.classList.contains('-selected-')) {
            param.classList.add('-in-range-');
            param = param.nextElementSibling;
        }
        param.classList.add('-range-to-');
        console.log($('.-selected-'));
    });
}









