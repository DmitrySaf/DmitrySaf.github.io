const $headerTrigger = $('.header__hamburger-trigger');

$headerTrigger.on('click', (e) => {
  e.stopPropagation();
  onHeaderMenuOpen(e);
  document.addEventListener('click', onHeaderMenuOpen);
});

const onHeaderMenuOpen = (e) => {
  const isContent = e.target.closest('.header__hamburger-content');

  if (!isContent && $headerTrigger.hasClass('header__hamburger-trigger_active')) {
    $headerTrigger.removeClass('header__hamburger-trigger_active');
    document.removeEventListener('click', onHeaderMenuOpen);
    return;
  }
  if (!$headerTrigger.hasClass('header__hamburger-trigger_active')) {
    $headerTrigger.addClass('header__hamburger-trigger_active');
  }
};