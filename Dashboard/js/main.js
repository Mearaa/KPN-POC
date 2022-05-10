




///////////////////////////  DATA FOR CARDS /////////////////////////
async function fetchJSON2() {
    const response = await fetch('dummydata.json');
    const datapoints = await response.json();
    console.log(datapoints);
    return datapoints;
}

fetchJSON2().then(datapoints => {
      const team = datapoints.testData.map(function (index) {
     return index.rankingteam;
      })
      const id = datapoints.testData.map(function (index) {
        return index.rankingind
         })
      document.getElementById("number2").innerHTML ="#"+ team[6];
      document.getElementById("number3").innerHTML ="#"+ id[8];
    const klanten = datapoints.testData.map(testData => testData.klanten).reduce((test, testData) => testData + test);
    console.log(klanten);
    document.getElementById("number1").innerHTML = klanten;

    // const klanten = datapoints.testData.map(function (index) {
    //   return index.klanten;
});
// document.getElementById("number1").innerHTML = klanten[2];

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
    myChart.config.data.labels =  week;
    myChart.update();
  });

  fetchJSON().then(data => {
    const csat = data.chartdata.map(function (index) {
      return index.csat;
    });
    myChart.config.data.datasets[0].data = csat;
    myChart.update();
  });