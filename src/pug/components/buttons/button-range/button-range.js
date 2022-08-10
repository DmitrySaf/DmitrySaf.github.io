import 'ion-rangeslider/js/ion.rangeSlider.min';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import './button-range.sass';

const dataFromServer = {
  min: 2000,
  max: 18000,
};
const slider = $('#range');
const sliderLabel = $('.range-slider__label');
const priceSeparator = (data) => {
  const priceFrom = `${Math.floor(data.from / 1000)} ${data.from % 1000 === 0 ? '000' : data.from % 1000}`;
  const priceTo = `${Math.floor(data.to / 1000)} ${data.to % 1000 === 0 ? '000' : data.to % 1000}`;
  sliderLabel.text(`${priceFrom}₽ - ${priceTo}₽`);
};

slider.ionRangeSlider({
  type: 'double',
  min: dataFromServer.min,
  max: dataFromServer.max,
  step: 1,
  skin: 'round',
  from: 5000,
  to: 10000,
  hide_min_max: true,
  hide_from_to: true,
  onStart: priceSeparator,
  onChange: priceSeparator,
});
