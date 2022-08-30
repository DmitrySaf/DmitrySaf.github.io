const $filtersTrigger = $('.js-room-search__filters-trigger');
const $filters = $('.js-room-search__filters');
const $arrow = $('.js-room-search__arrow');

$filtersTrigger.on('click', () => {
  $filters.addClass('sidebar_show');
  $arrow.on('click', () => {
    $filters.removeClass('sidebar_show');
  });
});
