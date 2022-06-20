# Installation

- Download de git repo. 
- Open de desbetreffende index.html op de laptop / open de map met visual code en vervolgens live server of zet het online. 


## Gebruik Dashboard
Om de grafieken van de charts in het dashboard aan te passen moeten de test2.json bestanden aangepast worden. Het is belangrijk dat niet alleen het cijfer aangepast wordt maar ook de naam dat dit vervolgens ook in de code wordt aangepast. 

Vanaf regel 105 in de chart.js moeten er dan aanpassingen plaatsvinden. 

```javascript
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

```

Hier moet "week" aangepast worden naar welke gedefinieerd is in de test2.json. Hetzelfde geldt voor "groei".

### Belang van Async.
Vanaf regel 100 t'm 103 wordt er een asynchronous function. Dit zorgt ervoor dat je gebruik kan maken van await. Dit wilt zeggen dat er eerst gewacht wordt voor de data uit test2.json opgehaald is voordat er iets mee gedaan wordt. 

```javascript
async function fetchJSON() {
    const response = await fetch('test2.json'); // Pakt het bestand test2.json
    const data = await response.json(); // Wacht op de reactie dat de data binnen is. 
    return data; // Krijg de data terug
}
```

Een ander voorbeeld van de async functionaliteit is in de main.js. vanaf regel 2. Hier wordt de data opgehaald voor de cards waar het rankingteam, rankingID en waar alle geholpen klanten opgeteld worden en weergegeven worden. 

```javascript
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
```
## Gebruik Drag&Drop game

In de eerst gemaakte variant maak ik gebruik van lege divs en id's om ervoor te zorgen dat de afbeeldingen gekoppeld kunnen worden aan de lege divjes. Zo wordt er gecontroleerd of de id van de divjes en de id van de kabel gelijk is. Is dat het geval dan wordt de kabel eraan gelinked. 

Zo staat er in het drop event vanaf regel 47 alles wat benodigd is om dit te controleren. 

```javascript	
function drop(event) {
    event.preventDefault(); // Zorgt ervoor dat je geen eigen afbeeldingen kan draggen in deze omgeving
    event.target.classList.remove("empty-hover"); // Haalt de empty-hover class weg
    event.target.classList.remove("draggable-hover"); // Haalt de draggable-hover class weg
    const draggableElementData = event.dataTransfer.getData("text"); // Haalt de "text" op van dragstart
    const droppableElementData = event.target.getAttribute("data-draggable-id");// Haalt de ID op van dragstart
    if(draggableElementData === droppableElementData){ // Als de data gelijk zijn aan elkaar zal de image gedropped worden.
        event.target.classList.add("dropped");  // Voegt de class dropped toe
        const draggableElement = document.getElementById(draggableElementData); // Voegt de draggable element toe aan het dropped element
        draggableElement.classList.add("dragged"); // voegt de dragged class toe
        draggableElement.setAttribute("draggable", "false"); // Image kan niet meer gedragged worden
        event.target.innerHTML = `<img src=${draggableElement.src} alt=${draggableElement.alt}>`; // Plaatst de image in het vak

``` 
De kabel afbeeldingen worden gedefineerd in de HTML vanaf regel 14 t'm 17 met daarbij de bijpassende id's. 
```html
  <img src="img/wankabel.png" class="draggable" draggable="true" alt="wan" id="wan">
        <img src="img/phonekabel.png" class="draggable" draggable="true" alt="tel" id="tel">
        <img src="img/powerkabel.png" class="draggable" draggable="true" alt="power" id="power">
        <img src="img/utpkabel.png" class="draggable" draggable="true" alt="utp" id="utp">
``` 

De lege divjes met bijpassend id worden gedefineerd vanaf regel 23 tm 27. Regel 23 bevat een id wat niet bij een van de kabels past. 
Deze blijft erin staan om ervoor te zorgen dat de spacing tussen de divs beter is. 

```html
 <div class="empty" data-draggable-id="dsl"></div>
    <div class="empty"data-draggable-id="utp"></div>
    <div class="empty"data-draggable-id="tel"></div>
    <div class="empty"data-draggable-id="wan"></div>
    <div class="empty"data-draggable-id="power"></div>
```

De afbeelding van de modem kan aangepast worden via de css vanaf regel 53 onder de container class. 
```css
.container{
      width: 61rem;
      height: 30rem;
      display: flex;
      align-items: center;
    justify-content: center;
    background-image: url("../img/test3.png");
  }

```

### Verbeterde drag & drop. 

In de vorige versie, hoewel het werkt, worden de kabels niet op een goede manier gekoppeld aan de divs. Daarbij komt dat ik de divs niet goed kan neerzetten over de poorten. Ik ben om deze reden een nieuwe versie gaan maken waarbij ik gebruik maak van svgs en parent en child. 
Hierbij heb ik er ook voor gezorgd dat er een score is, een reset knop, en feedback in hoeverre de gebruiker goed bezig is. 

Het aanpassen van het bericht die de gebruiker krijgt en hoeveel punten voor dat bericht nodig zijn is te vinden vanaf regel 51 tm  59. 

```javascript
if (total_score <= 100) {
      message.innerHTML = "Je hebt het super goed aangesloten!";
    }
    if (total_score <= 70) {
      message.innerHTML =
        "Het is je gelukt maar niet zonder slag of stoot. Oefen nog een beetje.";
    }
    if (total_score <= 50) {
      message.innerHTML = "Helaas, dit ging niet goed. Probeer het nog een keer.";

```

Er wordt gecontroleerd of de kabel in de juiste poort zit door gebruik te maken van parent en child. Dit wordt voor alle kleuren van de poorten gedaan. Vanaf regel 80 tm  147 is dit terug te vinden. Ook staat daar een manier bij om het te controleren middel van eerst een forEach toe te voegen. Later bleek dat dit niet nodig was en is de rest ook aangepast. Een snippet van de code staat hieronder. 

```javascript 
green.addEventListener("dragend", (event) => {
  const t = green.children;
  event.preventDefault();
  if (t[0].id == "green") {
    return;
  } else {
    total_score = total_score - 10;
    score.innerHTML = total_score;
  }
});
```

### Andere SVG's
Om andere SVG's toe te voegen aan de html of helemaal aan te passen kan er via adobe illustrator op SVG code gedrukt worden bij het exporteren van een SVG. Dit kan dan toegevoegd worden aan de html om bestaande elementen te vervangen of om elementen toe te voegen. 

## Einde Readme. 






