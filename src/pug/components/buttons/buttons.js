import './button__checkbox/button__checkbox';
import './button__default/button__default';
import './button__like/button__like';
import './button__radio/button__radio.sass';
import './button__rating/button__rating.sass';
import './button__toggle/button__toggle.sass';
import './button__next/button__next.sass';
import './button__range/button__range';




// js for like button

$('.like').on('click', (e) => {
    const likeButton = e.currentTarget,
          likeButtonIcon = likeButton.firstElementChild,
          likeButtonText = likeButton.lastElementChild;
    
    likeButton.classList.toggle('like_active');

    likeButtonIcon.textContent = (likeButtonIcon.textContent == 'favorite_border' ? 'favorite': 'favorite_border');
    likeButtonIcon.classList.toggle('material-icons_border');

    let counter = +likeButtonText.textContent;
    likeButtonText.textContent = (!likeButtonText.classList.contains('like__counter_active') ? ++counter: --counter);
    likeButtonText.classList.toggle('like__counter_active');
});