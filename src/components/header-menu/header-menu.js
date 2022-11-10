const $menuLinkCheckbox = $('.header-menu__link-checkbox');

$menuLinkCheckbox.on('click', function uncheck() {
  $menuLinkCheckbox.not(this).prop('checked', false);
});
