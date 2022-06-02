console.clear();
///////////////////////////////////////////////
let mouseDown = false;
let paintedCells = [];
let cellArray = [];
let eraser = false;
let cellHeight = 10;
let numberOfCells = 4000;

const eraserTool = document.querySelector("#eraser");
const canvas = document.querySelector("#canvas");
const canvasColor = document.getElementById("canvasColor");
const brushColor = document.getElementById("brushColor");
const rangeInput = document.getElementById("resolution");
const rangeCounter = document.querySelectorAll(".rangeCounter");

rangeCounter.forEach((counter) => {
  counter.addEventListener("click", (event) => {
    if (event.target.id === "decrement") {
      rangeInput.value = rangeInput.value - 1;
    }
    if (event.target.id === "increment") {
      rangeInput.value = rangeInput.value + 1;
    }
    calculateResolution(rangeInput.value);
    canvas.innerHTML = "";
    createDiv();
  });
});

function calculateResolution(cellSize) {
  const canvasSize = 400000;
  numberOfCells = canvasSize / (cellSize * cellSize);
  cellHeight = cellSize;
  // return cellNumber;
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
canvas.addEventListener("click", () => {
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
    cell.setAttribute("draggable", "false");
    cell.setAttribute("id", "cell" + i);
    cell.style.height = cellHeight + "px";
    cell.style.width = cellHeight + "px";
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

canvasColor.oninput = () => {
  console.log(canvasColor);
  canvas.style.backgroundColor = canvasColor.value;
};
brushColor.oninput = () => {
  paintedCells.forEach((cell) => {
    // cell.style.backgroundColor = brushColor.value;
  });
};
