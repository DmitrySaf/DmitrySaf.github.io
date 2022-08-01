import 'chart.js/dist/chart.min';

import './room-info.sass';

if ($(location).attr('pathname') === '/room-info.html') {
    var chartElem = document.getElementById('myChart').getContext('2d');
    console.log('done');
    //gradients
    
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
    
    // chart
    
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
    
    let chart = new Chart(chartElem, {
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
    
    
    //chart inner text
    
    let votesSum = data.datasets[0].data.reduce((accum, value) => accum + value);
    
    const votesEndings = (votes) => {
        if ((votes % 10 == 1) && (votes != 11)) {
            return `голос`;
        } else if (((votes % 10 == 2) || (votes % 10 == 3) || (votes % 10 == 4)) && (votes != 12) && (votes != 13) && (votes != 14)) {
            return `голоса`  ;
        } else {
            return `голосов`;
        }
    };
    
    $('.room-info__evaluation_chart_votes').html(`${votesSum} <span>${votesEndings(votesSum)}</span>`);
}
