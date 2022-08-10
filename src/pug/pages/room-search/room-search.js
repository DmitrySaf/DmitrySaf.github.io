import './room-search.sass';

const $filtersTrigger = $('.js-room-search__filters_trigger');
const $filters = $('.js-room-search__filters');
const $arrow = $('.js-room-search__arrow');

$filtersTrigger.on('click', () => {
  $filters.addClass('sidebar__show');
  $arrow.on('click', () => {
    $filters.removeClass('sidebar__show');
  });
});
