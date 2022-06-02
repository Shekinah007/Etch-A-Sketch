console.clear();

let mouseDown = false;
let paintedCells = [];
let cellArray = [];
const stepValues = [5, 10, 20];
let eraser = false;
let cellHeight = 10;
let numberOfCells = 4000;
let showGrid = true;

const eraserTool = document.getElementById("eraser");
const canvas = document.getElementById("canvas");
const canvasColor = document.getElementById("canvasColor");
const brushColor = document.getElementById("brushColor");
const rangeInput = document.getElementById("resolution");
const rangeCounter = document.querySelectorAll(".rangeCounter");
const gridButton = document.getElementById("gridToggle");

gridButton.addEventListener("click", () => {
  // showGrid = !showGrid;
  cellArray.forEach((cell) => {
    cell.classList.toggle("borderChange");
  });
});
rangeCounter.forEach((counter) => {
  counter.addEventListener("click", (event) => {
    if (event.target.id === "decrement") {
      rangeInput.value = rangeInput.value - 1;
      console.log(rangeInput.value);
    }
    if (event.target.id === "increment") {
      rangeInput.value = rangeInput.value + 1;
      console.log(rangeInput.value);
    }
    calculateResolution(rangeInput.value);
    canvas.innerHTML = "";
    createDiv();
  });
});

canvasColor.oninput = () => {
  console.log(canvasColor);
  canvas.style.backgroundColor = canvasColor.value;
};

function calculateResolution(cellSize) {
  const canvasSize = 400000;
  numberOfCells = canvasSize / (cellSize * cellSize);
  cellHeight = cellSize;
}

rangeInput.onchange = () => {
  console.log(rangeInput.value);
  calculateResolution(rangeInput.value);
  canvas.innerHTML = "";
  createDiv();
};

eraserTool.addEventListener("click", () => {
  eraser = !eraser;
  console.log(eraser);
});
canvas.addEventListener("mousedown", () => {
  if (mouseDown === true) {
    mouseDown = false;
  } else {
    mouseDown = true;
  }
});

function createDiv() {
  for (let i = 0; i < numberOfCells; i++) {
    let cell = document.createElement("div");

    cell.classList.add("gridCell");
    cell.style.height = cellHeight + "px";
    cell.style.width = cellHeight + "px";
    // if (showGrid === true) {
    //   cell.style.border = "none";
    // }
    cell.addEventListener("mousemove", (e) => {
      if (mouseDown == true) {
        // cell.classList.add("changeColour");
        cell.style.backgroundColor = brushColor.value;
        // paintedCells.push(cell);
        console.log(paintedCells, "paint");
      }
      if (e.shiftKey) {
        // cell.classList.add("changeColour");
        cell.style.backgroundColor = brushColor.value;
        // paintedCells.push(cell);
        console.log(paintedCells, "paint");
      }
      if (mouseDown == true && eraser === true) {
        cell.style.transition = "0s";
        cell.style.background = "none";
      }
    });

    canvas.appendChild(cell);
    cellArray.push(cell);
    // console.log(cellArray);
  }
}

window.addEventListener("load", () => {
  createDiv();
});

// setTimeout(() => {
//   let cells = cellArray;
//   cells.forEach((cell) => {
//     cell.addEventListener("mouseover", (e) => {
//       console.log(e);
//       if (e.shiftKey) {
//         console.log(cell.id);
//         cell.classList.add("changeColour");
//       }
//     });
//   });
// }, 1000);

function icCreaseResolution() {}
