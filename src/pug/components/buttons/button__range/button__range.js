import 'ion-rangeslider/js/ion.rangeSlider.min';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import './button__range.sass';

let dataMinFromServer = 2000,
    dataMaxFromServer = 18000;

$("#range").ionRangeSlider({
    type: 'double',
    min: dataMinFromServer,
    max: dataMaxFromServer,
    step: 1,
    skin: 'round',
    from: 5000,
    to: 10000,
    hide_min_max: true,
    hide_from_to: true,
    onStart: priceSeparator,
    onChange: priceSeparator
});

function priceSeparator(data){
    let priceFrom = `${Math.floor(data.from / 1000)} ${data.from % 1000 == 0 ? '000' : data.from % 1000}`,
        priceTo = `${Math.floor(data.to / 1000)} ${data.to % 1000 == 0 ? '000' : data.to % 1000}`;
    $('.range-slider__label').text(`${priceFrom}₽ - ${priceTo}₽`);
}
    