import './button-like.sass';

const likeButton = $('.js-like');

likeButton.on('click', (e) => {
  const $button = $(e.currentTarget);
  const $icon = $button.find('.js-material-icons');
  const $counter = $button.find('.js-like__counter');
  const counterValue = +$counter.text();

  $button.toggleClass('like_active');
  $icon
    .text($icon.text() === 'favorite_border' ? 'favorite' : 'favorite_border')
    .toggleClass('material-icons_border');
  $counter
    .text($counter.hasClass('like__counter_active') ? (counterValue - 1) : (counterValue + 1))
    .toggleClass('like__counter_active');
});
