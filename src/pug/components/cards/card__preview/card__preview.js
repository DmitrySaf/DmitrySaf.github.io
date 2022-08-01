import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.css';
import './card__preview.sass';

// card class

class CardPreview {
    constructor (img, roomNumber, roomStatus, roomPrice, roomComments, link) {
        this.roomNumber = roomNumber;
        this.roomStatus = roomStatus;
        this.roomPrice = roomPrice;
        this.roomComments = roomComments;
        this.link = link;
        
        //html for more than one img of a room

        if (img.length > 1) {
            let imgHtml = '';
            img.forEach((item) => {
                imgHtml += `<img src='../assets/img/${item}'>`;
            });
            this.img = imgHtml;
        } else {
            this.img = img;
        }

    }

    htmlInner() {
        const elem = $('<div></div>', {
            'class': 'card-preveiw',
            html: `
                <div class="card card_size_s">
                    <div class="card-preview__slider">
                        ${this.img}
                    </div>
                    <a class="card-preview__link" href=${this.link}></a>
                    <div class="card-preview__content">
                        <div class="card-preview__header_container">
                            <div class="card-preview__header_number"><span>№ </span> ${this.roomNumber}</div>
                            <div class="card-preview__header_wrapper">
                                <h3 class="card-preview__header_status">${this.roomStatus}</h3>
                                <div class="card-preview__header_price">${this.roomPrice}₽ <span>в сутки</span></div>
                            </div>
                        </div>
                        <div class="card-preview__feedback_container">
                            <div class="rating">
                                <input class="rating__star" name='star' value='1' type='radio'>
                                <span class="rating__star_active"></span>
                                <input class="rating__star" name='star' value='2' type='radio'>
                                <span class="rating__star_active"></span>
                                <input class="rating__star" name='star' value='3' type='radio'>
                                <span class="rating__star_active"></span>
                                <input class="rating__star" name='star' value='4' type='radio'>
                                <span class="rating__star_active"></span>
                                <input class="rating__star" name='star' value='5' type='radio'>
                                <span class="rating__star_active"></span>
                            </div>
                            <div class="card-preview__feedback"><span>${this.roomComments}</span> Отзывов</div>
                        </div>
                    </div>
                </div>
            `
        });
        $('.room-search__content_grid').append(elem);
    }
}
$('.card-preview__slider').slick({
    dots: true,
    dotsClass: 'card-preview__dots',
    nextArrow: '<div class="card-preview__arrow_next"></div>',
    prevArrow: '<div class="card-preview__arrow_prev"></div>'
});