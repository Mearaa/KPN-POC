const ctx = document.getElementById('myChart').getContext('2d');
fetchJSON();
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['.', '.', '.', '.', '.', '.', '.', '.'],
        datasets: [{
            label: '',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',

            ],

            borderWidth: 1
        }]


    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'CSAT Percentage per week'
            },


        },

    }
});


async function fetchJSON() {
    const response = await fetch('test2.json');
    const data = await response.json();
    console.log(data);
    return data;
}
fetchJSON().then(data => {
    const week = data.chartdata.map(function (index) {
        return index.week;
    });
    myChart.config.data.labels = week;
    myChart.config.data.label = week;
    myChart.update();
});

fetchJSON().then(data => {
    const csat = data.chartdata.map(function (index) {
        return index.csat;

    });
    myChart.config.data.datasets[0].data = csat;
    myChart.update();
});