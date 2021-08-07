import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.css';

// card class

class CardPreview {
    constructor (img, roomNumber, roomStatus, roomPrice, roomComments) {
        this.roomNumber = roomNumber;
        this.roomStatus = roomStatus;
        this.roomPrice = roomPrice;
        this.roomComments = roomComments;
        
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
        const elem = $('<a></a>', {
            'class': 'card-preveiw__link',
            html: `
                <div class="card card_size_s">
                    <div class="card-preview__slider">
                        ${this.img}
                    </div>
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

// new CardPreview(['card-preview-luxe.png', 'card-preview-standard.png', 'card-preview-luxe.png', 'card-preview-standard.png'], '888', 'люкс', '9 990', '145').htmlInner();

//slider for all the cards

$('.card-preview__slider').slick({
    dots: true,
    dotsClass: 'card-preview__dots',
    nextArrow: '<div class="card-preview__arrow_next"></div>',
    prevArrow: '<div class="card-preview__arrow_prev"></div>'
});