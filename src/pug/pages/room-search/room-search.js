import './room-search.sass';

$('.room-search__filters_trigger').on('click', () => {
    $('.room-search__filters').addClass('sidebar__show');
    $('.room-search__arrow').on('click', () => {
        $('.room-search__filters').removeClass('sidebar__show');
    });
});