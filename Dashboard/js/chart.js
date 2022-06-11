const ctx = document.getElementById('myChart').getContext('2d');
let week = [];
let delayed;
fetchJSON();
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:[], // Deze puntjes moeten er staan anders wordt de data niet ingeladen. 
        datasets: [{
            label: 'CSAT Percentage',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Achtergrond kleur van de bars
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
        scales:{
            // x:{
            //     display:false
            // },
            // y:{
            //     display:false
            // },
        },
        animation: {
            duration: 0,
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'CSAT Percentage per week' // Voegt titel toe aan de top
            },


        },

    }
});


async function fetchJSON() {
    const response = await fetch('test2.json'); // Pakt het bestand test2.json
    const data = await response.json(); // Wacht op de reactie dat de data binnen is. 
    return data; // Krijg de data terug
}
fetchJSON().then(data => {
    const week = data.chartdata.map(function (index) { // Zoekt in de chartdata van de test2.json en pakt de week. 
        return index.week;
    })
    myChart.config.data.labels = week;
    myChart.update();
});

fetchJSON().then(data => {
    const csat = data.chartdata.map(function (index) {
        return index.csat;
    });
    myChart.config.data.datasets[0].data = csat;
    myChart.update();
});