import 'twbs-pagination/jquery.twbsPagination.min';

window.onload = () => {
  const $pagination = $('.js-pagination__wrapper');
  const data = {
    rooms: 180,
    pages: Math.ceil(180 / 12),
  };

  $pagination.twbsPagination({
    totalPages: data.pages,
    visiblePages: 4,
    pageClass: 'pagination__item',
    lastClass: 'pagination__item pagination__item_last js-pagination__item_last',
    activeClass: 'pagination__item_active',
    anchorClass: 'pagination__link',
    nextClass: 'pagination__item_next js-pagination__item_next',
    disabledClass: 'pagination__item_disabled',
    next: ' ',
    first: '',
    prev: '',
    last: `${data.pages}`,
    onPageClick(event, page) {
      const $lastLink = $('.js-pagination__item_next').prev().children();
      const $lastPage = $('.js-pagination__item_last').children();
      const $pagesCurrent = $('span.js-pages__current');
      const $roomsOverall = $('span.js-rooms__overall');

      $lastLink.text('...');

      if (page === (data.pages - 3)) {
        $lastLink.text(data.pages - 1);
      }
      if (page >= (data.pages - 2)) {
        $lastLink.text(data.pages);
        $lastPage.text('');
      }

      $pagesCurrent.text(`
        ${(page * 12) - 11} - ${page * 12}
      `);
      $roomsOverall.text(`
        ${(data.rooms > 100) ? '100+' : data.rooms}
      `);
    },
  });
};
