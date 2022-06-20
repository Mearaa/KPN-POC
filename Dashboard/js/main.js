///////////////////////////  DATA FOR CARDS /////////////////////////
async function fetchJSON2() {
    const response = await fetch('dummydata.json'); // haalt de dummydata.json op
    const datapoints = await response.json(); // wacht op reactie
    console.log(datapoints);
    return datapoints; // krijgt de data terug
}

fetchJSON2().then(datapoints => {
      const team = datapoints.testData.map(function (index) {
     return index.rankingteam; // haalt de rankingteam op
      })
      const id = datapoints.testData.map(function (index) {
        return index.rankingind // haalt de rankingind op
         })
      document.getElementById("number2").innerHTML ="#"+ team[team.length-1]; // Voegt in de html met id number2 het laatste team ranking op. 
      document.getElementById("number3").innerHTML ="#"+ id[id.length-1]; // Voegt in de html met id number3 het laatste id ranking op. 
    const klanten = datapoints.testData.map(testData => testData.klanten).reduce((test, testData) => testData + test); // haalt alles van het eerste getal in de array, vervolgens telt hij alles weer bij elkaar op.
    document.getElementById("number1").innerHTML = klanten; // voegt de aantal klanten toe in de html met id number1
});
// document.getElementById("number1").innerHTML = klanten[2];

