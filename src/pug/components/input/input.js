import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';
import './input.sass';



const inputArrival = $('#input-date_dropdown-arrival'),
      inputDeparture = $('#input-date_dropdown-departure');

let datepickerArrival = inputArrival.datepicker().data('datepicker');

$('#arrow-arrival, #arrow-departure, #input-date_dropdown-departure, #input-date_dropdown-arrival').on('click', () => {
    datepickerArrival.show();
    if ($('.datepicker--button').length === 1){
        $('.datepicker--buttons').append('<div class="datepicker--button" id="datepicker-accept">Применить</div>');
        $('#datepicker-accept').on('click', () => {
            datepickerArrival.hide();
        });
    }
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
    },
    multipleDates: 2,
    range: true,
    clearButton: true,
});