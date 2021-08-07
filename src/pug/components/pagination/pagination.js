import 'twbs-pagination/jquery.twbsPagination.min';
import './pagination.sass';

window.onload = () => {
    $('.pagination__wrapper').twbsPagination({
        totalPages: 15,
        visiblePages: 3,
        pageClass: 'pagination__item',
        lastClass: 'pagination__item pagination__item_last',
        activeClass: 'pagination__item_active',
        anchorClass: 'pagination__link',
        nextClass: 'pagination__item_next',
        disabledClass: 'pagination__item_disabled',
        next: ' ',
        first: '',
        prev: '',
        last: '15',
        onPageClick: function (event, page) {
            if (page == 15 - 1) {
                $('.pagination__item_last').text('');
            }
                
            $('.pagination__wrapper').append('<li class="pagination__item pagination__item_etc"> <a class="pagination__link">...</li>');
            if (page == 15 - 3) {
                $('.pagination__item_etc').html(`<a class="pagination__link">${15 - 1}`);
            }
            if (page >= 15 - 2) {
                $('.pagination__item_etc').addClass('disabled');
            }
        }
    });
};