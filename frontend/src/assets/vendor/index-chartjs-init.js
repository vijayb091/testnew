/**
 * Created by mosaddek on 1/24/18.
 */

var ctx = document.getElementById('myChart-light').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgba(167,104,243,.2)',
            borderColor: 'rgba(167,104,243,1)',
            data: [0, 20, 9, 25, 15, 25,18]
        }]


    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },

        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                tension: 0.00001,
                //tension: 0.4,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4
            }
        }
    }
});


var ctx = document.getElementById('myChart-tow-light').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgba(54,162,245,.2)',
            borderColor: 'rgba(54,162,245,1)',
            //data: [6.06, 82.2, -22.11, 21.53, -21.47, 73.61, -53.75, -60.32]
            data: [70, 45, 65, 50, 65, 35, 50]
        }]


    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                //tension: 0.00001,
                tension: 0.4,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4
            }
        }
    }
});