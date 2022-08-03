import { Chart } from "chart.js/dist/chart.min";

import "./advantages/advantages";
import "./cancel/cancel";
import "./collage/collage";
import "./evaluation/evaluation";
import "./feedback/feedback";
import "./rules/rules";
import "./room-info.sass";

if ($(window)[0].document.title === 'Room') {
    const chartElem = document.querySelector('.js-myChart').getContext('2d');
    const $chartVotes = $('.js-evaluation__chart-votes');
    
    let great_gradient = chartElem.createLinearGradient(0, 0, 0, 450);
    great_gradient.addColorStop(0, '#FFE39C');
    great_gradient.addColorStop(1, '#FFBA9C');
    
    let good_gradient = chartElem.createLinearGradient(0, 0, 0, 450);
    good_gradient.addColorStop(0, '#6FCF97');
    good_gradient.addColorStop(1, '#66D2EA');
    
    let satisfactory_gradient = chartElem.createLinearGradient(0, 0, 0, 450);
    satisfactory_gradient.addColorStop(0, '#BC9CFF');
    satisfactory_gradient.addColorStop(1, '#8BA4F9');
    
    let upset_gradient = chartElem.createLinearGradient(0, 0, 0, 450);
    upset_gradient.addColorStop(0, '#919191');
    upset_gradient.addColorStop(1, '#3D4975');

    let data = {
        datasets: [
            {
                data: [130, 65, 65, 0],
                backgroundColor: [
                    great_gradient,
                    good_gradient,
                    satisfactory_gradient,
                    upset_gradient
                ],
                cutout: '90%',
                spacing: 2
            }
        ]
    };

    let votesSum = data.datasets[0].data.reduce((accum, value) => accum + value);
    
    new Chart(chartElem, {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    const votesEndings = (votes) => {
        if ((votes % 10 == 1) && (votes != 11)) {
            return 'голос';
        } else if (((votes % 10 == 2) || (votes % 10 == 3) || (votes % 10 == 4)) && (votes != 12) && (votes != 13) && (votes != 14)) {
            return 'голоса';
        } else {
            return 'голосов';
        }
    };
    $chartVotes
        .text(`${votesSum}`)
        .append($('<span></span>', {
            text: votesEndings(votesSum)
        }))
}
