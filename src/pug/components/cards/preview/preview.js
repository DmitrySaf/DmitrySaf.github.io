import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.css';


$('.card-preview__slider').slick({
    dots: true,
    dotsClass: 'card-preview__dots',
    nextArrow: '<div class="card-preview__arrow_next"></div>',
    prevArrow: '<div class="card-preview__arrow_prev"></div>'
});