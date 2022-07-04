const draggables = document.querySelectorAll(".wire");
const contains = document.querySelectorAll(".contain ");
const connections = document.querySelector(".connections");
var total_score = 100;

score = document.getElementById("totalscore");
const yellow = document.querySelectorAll(".yellow");
const green = document.querySelectorAll(".green");
const black = document.querySelector(".black");
const red = document.querySelector(".red");
const grey = document.querySelector(".grey");
const rest = document.querySelector("#reset");
const y = document.querySelector("#yellow");
const gr = document.querySelector("#green");
const b = document.querySelector("#black");
const r = document.querySelector("#red");

// Reset alle wires terug naar hun originele positie wanneer er op de reset knop gedrukt wordt. 
rest.addEventListener("click", () => {
  contains.forEach((contain) => {
    child = contain.lastElementChild;
    //console.log(child);  testing 
    if (child == null) {
      return;
    } else {
      contain.removeChild(child);
      connections.appendChild(y);
      connections.appendChild(gr);
      connections.appendChild(b);
      connections.appendChild(r);
    }
    total_score = 100; // Zet de totale score weer op 100. 
    score.innerHTML = total_score;
  });
});

// voor dragging kabels
draggables.forEach((draggable) => {
  //console.log(draggables.length); // testing 
  score.innerHTML = total_score;
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging"); // voegt de klass dragging toe aan het element
    //console.log("start"); //testing
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    //testing console.log(message);
    //testing console.log(total_score);
    //testing console.log(connections.children.length);
    if (total_score <= 100) {
      message.innerHTML = "Je hebt het super goed aangesloten!";
    }
    if (total_score <= 70) {
      message.innerHTML =
        "Het is je gelukt maar niet zonder slag of stoot. Oefen nog een beetje.";
    }
    if (total_score <= 50) {
      message.innerHTML = "Helaas, dit ging niet goed. Probeer het nog een keer.";
    }
  });
});
// Voegt de class dragging toe aan de wires als ze gedragged worden. 
contains.forEach((contain) => {
  contain.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    contain.appendChild(draggable);
  });
});
// Laat de score zien. 
score = document.getElementById("totalscore");
score.innerHtml = total_score;
if (document.querySelector(".connections").length == 0) {
  score = document.getElementById("totalscore");
  score.innerHTML = total_score;
}
// Iedere container checkt of de juiste kabel erin zit. 

yellow.forEach((item) =>
  item.addEventListener("dragend", (event) => {
    const t = item.children;
    console.log(t);
    event.preventDefault();
    console.log(t[0].id);
    if (t[0].id == "yellow") {
      return;
    } else {
      // if not then score will be deducted
      total_score = total_score - 10;
      score.innerHTML = total_score;
    }
  })
);

// Deze reeks controleerd of de juist gekleurde kabel in de juist gekleurde poort zit. Zoniet dan gaat er 10 punten van de score af. 

green.forEach((item) => {
  item.addEventListener("dragend", (event) => {
    const t = item.children;
    event.preventDefault();
   // console.log(t[0].id);
    if (t[0].id == "green") {
      return;
    } else {
      total_score = total_score - 10;
      score.innerHTML = total_score;
    }
  });
});

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

black.addEventListener("dragend", (event) => {
  const t = black.children;
  event.preventDefault();
  if (t[0].id == "black") {
    return;
  } else {
    total_score = total_score - 10;
    score.innerHTML = total_score;
  }
});

red.addEventListener("dragend", (event) => {
  const t = red.children;
  event.preventDefault();
  if (t[0].id == "red") {
    return;
  } else {
    total_score = total_score - 10;
    score.innerHTML = total_score;
  }
});

grey.addEventListener("dragend", (event) => {
  const t = grey.children;
  event.preventDefault();
  if (t[0].id == "grey") {
    return;
  } else {
    total_score = total_score - 10;
    score.innerHTML = total_score;
  }
});
