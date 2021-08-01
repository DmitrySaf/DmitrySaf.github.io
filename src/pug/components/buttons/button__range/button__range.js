import 'ion-rangeslider/js/ion.rangeSlider.min';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import './button__range.sass';

let dataMinFromServer = 2000,
    dataMaxFromServer = 18000;

$("#range").ionRangeSlider({
    type: 'double',
    min: dataMinFromServer,
    max: dataMaxFromServer,
    step: 10,
    skin: 'round',
    from: 5000,
    to: 10000,
    hide_min_max: true,
    hide_from_to: true,
    values_separator: ' - ',
    onStart: (data) => {
        $('.range-slider__label').text(`${data.from} - ${data.to}`);
    },
    onChange: (data) => {
        $('.range-slider__label').text(`${data.from} - ${data.to}`);
    }
});

