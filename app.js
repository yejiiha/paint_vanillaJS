const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // Context of canvas is what controls pixels inside of it
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700; // Canvas should have css size and pixel modifier size (its width and height)

ctx.strokeStyle = "#2c2c2c"; // All the lines inside context have color
ctx.lineWidth = 2.5; // The width of line is 2.5px

let painting = false;

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
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // Click on mouse
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
