import { Chart } from 'chart.js/dist/chart.min';

if ($(window)[0].document.title === 'Room') {
  const chartElem = document.querySelector('.js-myChart').getContext('2d');
  const $chartVotes = $('.js-room-info__evaluation-votes');

  const greatGradient = chartElem.createLinearGradient(0, 0, 0, 450);
  greatGradient.addColorStop(0, '#FFE39C');
  greatGradient.addColorStop(1, '#FFBA9C');

  const goodGradient = chartElem.createLinearGradient(0, 0, 0, 450);
  goodGradient.addColorStop(0, '#6FCF97');
  goodGradient.addColorStop(1, '#66D2EA');

  const satisfactoryGradient = chartElem.createLinearGradient(0, 0, 0, 450);
  satisfactoryGradient.addColorStop(0, '#BC9CFF');
  satisfactoryGradient.addColorStop(1, '#8BA4F9');

  const upsetGradient = chartElem.createLinearGradient(0, 0, 0, 450);
  upsetGradient.addColorStop(0, '#919191');
  upsetGradient.addColorStop(1, '#3D4975');

  const data = {
    datasets: [
      {
        data: [130, 65, 65, 0],
        backgroundColor: [
          greatGradient,
          goodGradient,
          satisfactoryGradient,
          upsetGradient,
        ],
        cutout: '90%',
        spacing: 2,
      },
    ],
  };

  const votesSum = data.datasets[0].data.reduce((accum, value) => accum + value);

  new Chart(chartElem, {
    type: 'doughnut',
    data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: false,
      },
    },
  });

  const createVotesEndings = (votes) => {
    if ((votes % 10 === 1) && (votes !== 11)) {
      return 'голос';
    } if (((votes % 10 === 2)
    || (votes % 10 === 3)
    || (votes % 10 === 4))
    && (votes !== 12)
    && (votes !== 13)
    && (votes !== 14)) {
      return 'голоса';
    }
    return 'голосов';
  };
  $chartVotes
    .text(`${votesSum}`)
    .append($('<span></span>', {
      text: createVotesEndings(votesSum),
    }));
}
