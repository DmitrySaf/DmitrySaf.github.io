class LikeButton {
  constructor(button) {
    this.$button = button;
    this.onClick();
  }

  onClick = () => {
    this.$button.on('click', (e) => {
      const button = $(e.currentTarget);
      const $icon = button.find('.js-button-like__icon');
      const $counter = button.find('.js-button-like__counter');
      const counterValue = +$counter.text();
    
      button.toggleClass('button-like_active');
      $icon
        .text($icon.text() === 'favorite_border' ? 'favorite' : 'favorite_border')
        .toggleClass('button-like__icon_color_dark');
      $counter
        .text($counter.hasClass('button-like__counter_active') ? (counterValue - 1) : (counterValue + 1))
        .toggleClass('button-like__counter_active');
    })
  }
}

export default LikeButton;
