const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
}); // Voegt de eventListeners toe aan alle elementen binnen de draggableElements. 

droppableElements.forEach(elem => {
    elem.addEventListener("dragenter",dragEnter);
    elem.addEventListener("dragover",dragOver);
    elem.addEventListener("drop", drop);
    elem.addEventListener("dragleave", dragLeave);
});

//Drag en drop Functions

function dragStart(event) {
    console.log("dragging");
    event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
  }

  function dragEnter(event){
      event.target.classList.add("droppable-hover");
  }
function dragOver(event){
    event.preventDefault();
}

function dragLeave(event){
    event.target.classList.remove("droppable-hover");
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    const draggableElementData = event.dataTransfer.getData("text");
    const droppableElementData = event.target.getAttribute("data-draggable-id");
    if(draggableElementData === droppableElementData){
        event.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementData);
        event.target.style.backgroundColor = draggableElement.style.color;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);

    }
}