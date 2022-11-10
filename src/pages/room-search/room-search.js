const $filtersTrigger = $('.js-room-search__filters-trigger');
const $filters = $('.js-room-search__filters');

const onFilterClose = () => {
  $filters.removeClass('room-search__filters_shown');
  $('body').css('position', 'initial');
};

$filtersTrigger.on('click', () => {
  $filters.addClass('room-search__filters_shown');
  $('body').css('position', 'fixed');
  $('.js-room-search__arrow, .js-room-search__button, .room-search__filters-overflow').on('click', onFilterClose);
});
