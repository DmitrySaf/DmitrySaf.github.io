import 'inputmask/dist/jquery.inputmask.min';
import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';

const $dropdownDateMasked = $('.js-dropdown-date_masked');
const $dropdownDate = $('.dropdown-date__input');
const $dropdownDateArrow = $('.dropdown-date__arrow');
const datepicker = $dropdownDate.first().datepicker().data('datepicker');

$dropdownDateMasked.inputmask({
  mask: '99.99.9999',
  placeholder: 'ДД.ММ.ГГГГ',
});

const appendAcceptButton = () => {
  datepicker.show();
  if ($('.datepicker--buttons').children().length === 1) {
    $('.datepicker--buttons').append('<div class="datepicker-accept">Применить</div>');
    $('.datepicker-accept').on('click', () => {
      datepicker.hide();
    });
  }
};

$dropdownDate.on('click', appendAcceptButton);
$dropdownDateArrow.on('click', appendAcceptButton);

$dropdownDate.first().datepicker({
  prevHtml: '<div class="datepicker--nav-action_prev"></div>',
  nextHtml: '<div class="datepicker--nav-action_next"></div>',
  navTitles: {
    days: 'MM <i>yyyy</i>',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2',
  },
  moveToOtherYearsOnSelect: false,
  minDate: new Date(),
  onSelect: (formattedDate, date) => {
    $dropdownDate.each((i) => {
      $dropdownDate[i].value = formattedDate.split(',')[i] ? formattedDate.split(',')[i] : '';
    });
    localStorage.setItem('firstDate', date[0]);
    localStorage.setItem('secondDate', date[1]);
  },
  multipleDates: 2,
  range: true,
  clearButton: true,
});

if ($(window)[0].document.title === 'Search rooms') {
  const $clearButton = $('.datepicker--button[data-action="clear"]');
  $clearButton.on('click', () => {
    localStorage.setItem('firstDate', new Date());
    localStorage.setItem('secondDate', new Date());
    datepicker.update();
  });
  if (localStorage.getItem('firstDate') && localStorage.getItem('secondDate')) {
    datepicker.selectedDates = [
      new Date(localStorage.getItem('firstDate')),
      new Date(localStorage.getItem('secondDate')),
    ];
  } else {
    datepicker.selectedDates = [new Date(), new Date()];
  }
  datepicker.update();
  $dropdownDate.datepicker({
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
      years: 'yyyy1 - yyyy2',
    },
    onRenderCell: (date) => {
      const startDay = new Date(localStorage.getItem('firstDate'));
      const endDay = new Date(localStorage.getItem('secondDate'));

      if (+date === +startDay) return { classes: '-range-from-' };
      if (+date === +endDay) return { classes: '-range-to-' };
      if ((date > startDay) && (date < endDay)) return { classes: '-in-range-' };
      return { classes: 'datepicker--cell' };
    },
  });
}
