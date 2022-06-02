console.clear();
///////////////////////////////////////////////
let mouseDown = false;
let paintedCells = [];
let cellArray = [];
let eraser = false;

const eraserTool = document.querySelector("#eraser");
const canvas = document.querySelector("#canvas");
const canvasColor = document.getElementById("canvasColor");
const brushColor = document.getElementById("brushColor");

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
  for (let i = 0; i < 10000; i++) {
    let cell = document.createElement("div");
    cell.classList.add("gridCell");
    cell.setAttribute("draggable", "false");
    cell.setAttribute("id", "cell" + i);
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
