console.clear();

let mouseDown = false;
let paintedCells = [];
let cellArray = [];
const stepValues = [5, 10, 20];
let eraser = false;
let cellHeight = 10;
let numberOfCells = 4000;
let showGrid = true;
let penActive = false;

const eraserTool = document.getElementById("eraser");
const canvas = document.getElementById("canvas");
const canvasColor = document.getElementById("canvasColor");
const brushColor = document.getElementById("brushColor");
const rangeInput = document.getElementById("resolution");
const rangeCounter = document.querySelectorAll(".rangeCounter");
const gridButton = document.getElementById("gridToggle");
const penIndicator = document.getElementById("penImg");

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
  penIndicator.classList.toggle("penAnimation");
  if (mouseDown === true) {
    console.log("pen Active");
    // penIndicator.style.backgroundColor = "grey";
    // penIndicator.classList.add("penAnimation");
    mouseDown = false;
  } else {
    console.log("Pen Inactive");
    // penIndicator.style.backgroundColor = "cyan";
    // penIndicator.classList.remove("penAnimation");

    mouseDown = true;
  }
});

function createDiv() {
  for (let i = 0; i < numberOfCells; i++) {
    let cell = document.createElement("div");

    cell.classList.add("gridCell");
    cell.style.height = cellHeight + "px";
    cell.style.width = cellHeight + "px";
    cell.addEventListener("mousemove", (e) => {
      if (mouseDown == true) {
        // cell.classList.add("changeColour");
        cell.style.backgroundColor = brushColor.value;
      }
      if (e.shiftKey) {
        // cell.classList.add("changeColour");
        cell.style.backgroundColor = brushColor.value;
        penIndicator.style.backgroundColor = "green";
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

window.addEventListener("keydown", (e) => {
  penIndicator.style.backgroundColor = "green";
  penIndicator.classList.add("penAnimation");
});
window.addEventListener("keyup", (e) => {
  penIndicator.style.background = "none";
  penIndicator.classList.remove("penAnimation");
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
