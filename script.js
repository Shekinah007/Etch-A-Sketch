// console.clear();
let domtoimage = require("dom-to-image-more");

let mouseDown = false;
let cellArray = [];
const stepValues = [5, 10, 20];
let eraser = false;
let cellHeight = 10;
let numberOfCells = 4000;
let showGrid = true;
let penActive = false;

const eraserTool = document.querySelector("#eraser");
const canvas = document.getElementById("canvas");
const canvasColor = document.getElementById("canvasColor");
const brushColor = document.getElementById("brushColor");
const rangeInput = document.getElementById("resolution");
const rangeCounter = document.querySelectorAll(".rangeCounter");
const gridButton = document.getElementById("gridToggle");
const penIndicator = document.getElementById("penImg");
const infoPanel = document.querySelector(".info-panel");
const infoBtn = document.querySelector(".info-btn");
const overlay = document.querySelector(".overlay");
const resetBtb = document.querySelector("#reset");
const saveBtn = document.querySelector("#saveBtn");

saveBtn.addEventListener("click", () => {
  domtoimage
    .toPng(canvas)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;

      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = "Etch-A-Sketch";
      anchor.click();

      // document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
});

resetBtb.addEventListener("click", () => {
  canvas.innerHTML = "";
  createDiv();
});
infoBtn.addEventListener("click", () => {
  infoPanel.classList.toggle("info-panel-visible");
  overlay.classList.toggle("overlay-visible");
  // infoBtn.classList.toggle("info-btn-active");
});
gridButton.addEventListener("click", () => {
  // showGrid = !showGrid;
  cellArray.forEach((cell) => {
    cell.classList.toggle("borderChange");
  });
});

rangeCounter.forEach((counter) => {
  counter.addEventListener("click", (event) => {
    if (event.target.id === "increment") {
      console.log(rangeInput.value);
      rangeInput.value = rangeInput.value + 1;
      console.log(rangeInput.value);
    } else if (event.target.id === "decrement") {
      rangeInput.value = rangeInput.value - 5;
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
  eraserTool.classList.toggle("eraserActive");
  console.log(eraser);
});
canvas.addEventListener("mousedown", (e) => {
  penIndicator.classList.toggle("penAnimation");
  // if (mouseDown === true) {
  //   console.log("pen Active");
  //   mouseDown = false;
  // } else {
  //   console.log("Pen Inactive");
  //   mouseDown = true;
  // }
  mouseDown = true;
  e.preventDefault();
});
canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
  penIndicator.classList.toggle("penAnimation");
});

function createDiv() {
  for (let i = 0; i < numberOfCells; i++) {
    let cell = document.createElement("div");

    cell.classList.add("gridCell");
    cell.style.height = cellHeight + "px";
    cell.style.width = cellHeight + "px";
    cell.addEventListener("mousemove", (e) => {
      if (mouseDown === true) {
        cell.style.backgroundColor = brushColor.value;
      }
      if (e.shiftKey === true && eraser === true) {
        cell.style.background = "none";
      } else if (e.shiftKey && mouseDown != true) {
        // cell.classList.add("changeColour");
        cell.style.backgroundColor = brushColor.value;
      }

      if (mouseDown == true && eraser === true) {
        cell.style.transition = "0s";
        cell.style.background = "none";
      }
    });

    canvas.appendChild(cell);
    cellArray.push(cell);
  }
}
window.addEventListener("keypress", (e) => {
  if (e.key == "e" || e.key == "E") {
    eraser = !eraser;
    eraserTool.classList.toggle("eraserActive");
  }
});

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Shift") {
    penIndicator.classList.add("penAnimation");
  }
});

window.addEventListener("keyup", (e) => {
  if (mouseDown != true) {
    penIndicator.classList.remove("penAnimation");
  }
});
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
