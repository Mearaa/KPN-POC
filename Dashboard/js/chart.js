const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('secondChart').getContext('2d');
let week = [];
let delayed;
fetchJSON();
const data = {
    labels: [
      'Wifi Expert',
      'Sales topper',
      '4G-baas',
      'TV-Tijger',
      'CSAT Knaller',
      'Factuur speurder',
      'Apple kenner'
    ],
    datasets: [{
      label: 'Week 1',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(0, 175, 234, 0.2)',
      borderColor: 'rgba(0, 175, 234,1)',
      pointBackgroundColor: 'rgba(0, 175, 234)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 175, 234)'
    }, {
      label: 'Week 2',
      data: [50, 70, 40, 80, 40, 20, 10],
      fill: true,
      backgroundColor: 'rgba(79, 184, 72, 0.2)',
      borderColor: 'rgba(80, 184, 72, 1)',
      pointBackgroundColor: 'rgba(79, 184, 72, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(79, 184, 72, 1)'
    }]
  };

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Deze puntjes moeten er staan anders wordt de data niet ingeladen. 
        datasets: [{
            label: 'Voortgang',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Achtergrond kleur van de bars
                'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
                'rgba(79, 184, 72, 1)',
               

            ],

            borderWidth: 3
        }]
    },
    options: {
        scales: {
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
                text: 'Voortgang' // Voegt titel toe aan de top
            },


        },

    }
});

const secondChart = new Chart(ctx2, {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    },
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
    const groei = data.chartdata.map(function (index) {
        return index.groei;
    });
    myChart.config.data.datasets[0].data = groei;
    myChart.update();
});