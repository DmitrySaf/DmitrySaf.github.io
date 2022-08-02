import './button__like.sass';

const likeButton = $('.like');

likeButton.on('click', (e) => {
    const button = $(e.currentTarget),
          buttonIcon = button.first(),
          buttonText = button.last();
    let counter = +buttonText.textContent;

    button.toggleClass('like_active');
    buttonIcon
        .text(buttonIcon.textContent == 'favorite_border' ? 'favorite': 'favorite_border')
        .toggleClass('material-icons_border');
    buttonText
        .text(!buttonText.classList.contains('like__counter_active') ? ++counter: --counter)
        .toggleClass('like__counter_active');
});