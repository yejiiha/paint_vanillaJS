const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // Context of canvas is what controls pixels inside of it
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");
const eraseBtn = document.getElementById("jsErase");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700; // Canvas should have css size and pixel modifier size

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // Fixing a bug that background color of canvas is transparent when you save the images
ctx.strokeStyle = INITIAL_COLOR; // All the lines inside context have color
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // The width of line is 2.5px
ctx.lineCap = "round";

let painting = false;
let filling = false;
let old = null;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath(); // Create a Path when we are not clicking. A path is a line.
    ctx.moveTo(x, y); // Move a path to (x, y) position of mouse
  } else {
    ctx.lineTo(x, y); // Connect the last point in the current sub-path to (x, y)
    ctx.stroke(); // Stroke the current sub-paths with the current stroke style
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // strokeStyle is gonna be the color on the target
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Paint";
  } else {
    filling = true;
    mode.innerText = "Fill";
  }
}

function handleFillClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRightClick(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");

  link.href = image;
  link.download = "PaintJs[🎨]";
  link.click();
}

function handleResetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleEraseClick() {
  const x = event.offsetX;
  const y = event.offsetY;

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(old.x, old.y);
  ctx.lineTo(x, y);
  ctx.stroke();

  old = { x: x, y: y };
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // Click on mouse
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFillClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}

if (eraseBtn) {
  eraseBtn.addEventListener("click", handleEraseClick);
}
