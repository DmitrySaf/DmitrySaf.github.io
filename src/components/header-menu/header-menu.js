const $menuLinkCheckbox = $('.menu__link-checkbox');

$menuLinkCheckbox.on('click', function() {
  $menuLinkCheckbox.not(this).prop('checked', false);
});