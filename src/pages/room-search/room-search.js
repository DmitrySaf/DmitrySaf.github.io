const $filtersTrigger = $('.js-room-search__filters-trigger');
const $filters = $('.js-room-search__filters');
const $arrow = $('.js-room-search__arrow');

$filtersTrigger.on('click', () => {
  $filters.addClass('room-search__filters_shown');
  $arrow.on('click', () => {
    $filters.removeClass('room-search__filters_shown');
  });
});
