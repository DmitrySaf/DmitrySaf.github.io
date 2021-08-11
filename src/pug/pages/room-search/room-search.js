import './room-search.sass';

$('.room-search__filters_trigger').on('click', (e) => {
    $('.room-search__filters').addClass('sidebar__show');
    $('.room-search__arrow').on('click', () => {
        $('.room-search__filters').removeClass('sidebar__show');
    });
    
});
/* $('.room-search__filters').prepend('<div class="arrow__main sidebar__arrow"></div>');
$('.sidebar__arrow').on('click', () => {
    $('.room-search__filters').removeClass('sidebar__show');
}); 
$('.room-search__filters').prepend('<div class="logo"><div class="logo__img"><img src="../assets/icons/logo.svg" alt="toxin"></div><div class="logo__title"> <img src="../assets/icons/title.svg" alt="toxin"></div></div>');

$('.room-search__filters').append('<button class="button button_size_m button_color_primary">применить</и>'); */