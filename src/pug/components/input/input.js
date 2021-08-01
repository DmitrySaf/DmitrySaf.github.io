import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';
import 'inputmask/dist/jquery.inputmask.min';
import './input.sass';

//maskedInput

$('.input__date').inputmask({
    mask: "99.99.9999",
    placeholder: "ДД.ММ.ГГГГ",});

//calendar

const inputArrival = $('#input__date_arrival'),
      inputDeparture = $('#input__date_departure'),
      inputFilter = $('#input__date_filter'),
      datepickerArrival = inputArrival.datepicker().data('datepicker'),
      datepickerFilter = inputFilter.datepicker().data('datepicker');

$('#input__arrow_departure, #input__arrow_arrival, #input__date_departure, #input__date_arrival').on('click', () => {
    datepickerArrival.show();
    console.log($('.datepicker--button').length);
    if ($('.datepicker--button').length === 2){
        $('.datepicker--buttons').append('<div class="datepicker--button datepicker-accept">Применить</div>');
        $('.datepicker-accept').on('click', () => {
            datepickerArrival.hide();
        });
    }
});

$('#input__arrow_filter, #input__date_filter').on('click', (e) => {
    datepickerFilter.show();
    $('.datepicker-accept').on('click', () => {
        datepickerFilter.hide();
    });
});

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

$('.datepicker--buttons').append('<div class="datepicker--button datepicker-accept">Применить</div>');

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
        datepickerFilter.selectedDates = date;
        datepickerFilter.update();
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