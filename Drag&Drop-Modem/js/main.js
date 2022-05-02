const draggableElements = document.querySelectorAll(".draggable-elements"); // selecteerd alle elementen in de draggable-elements section.
const droppableElements = document.querySelectorAll(".droppable-elements");// selecteerd alle elementen in de draggable-elements section.

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
}); // Voegt eventlisteners toe aan alle elementen binnen de draggable-elements sectipn. Hier wordt dragStart aan toegevoegd.

droppableElements.forEach(elem => {
    elem.addEventListener("dragenter",dragEnter);
    elem.addEventListener("dragover",dragOver);
    elem.addEventListener("drop", drop);
    elem.addEventListener("dragleave", dragLeave);
});
// Voegt eventlisteners toe aan alle elementen binnen de droppable-elements section. Hier wordt dragenter, dragover, drop en dragleave aan toegevoegd.

function dragStart(event) {
    console.log("dragging");
   event.dataTransfer.setData("text", event.target.id); // text/plain kan ook gebruikt worden.  
  }
  // Bij het starten van de dragstart wordt de tekst meegenomen en het id van het element. 

//   let dragStart = (event) =>
//     console.log("dragging");
//    event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
//   
// Zo zou de functie eruit ziet geformatteerd naar een arrow function


  function dragEnter(event){
    event.target.classList.add("empty-hover");
} //als de afbeelding die gedragged wordt over een droppable-element komt wordt de empty-hover class toegevoegd aan de droppable-elements.

function dragOver(event){
    event.preventDefault();
}
//haalt het standaard block icoontje weg als er gehovered wordt over een droppable-element met een draggable-element. 

function dragLeave(event){
    event.target.classList.remove("empty-hover");
} // Zodra de draggable-element het droppable-element gebied verlaat zal de hover weggehaald worden

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

    }
}