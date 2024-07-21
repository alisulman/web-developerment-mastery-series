// Define initial color and color array
let colorchange = "#f00";
let colorArray = [];

// Function to create and fill gradients on the canvas
function colorGradients(id, status) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Clear the canvas before drawing
  ctx.clearRect(0, 0, width, height);

  if (status === "panal") {
    // Gradient from white to the selected color
    const gradientFromRedToWhite = ctx.createLinearGradient(0, 0, width, 0);
    gradientFromRedToWhite.addColorStop(0, "#fff");
    gradientFromRedToWhite.addColorStop(1, colorchange);
    ctx.fillStyle = gradientFromRedToWhite;
    ctx.fillRect(0, 0, width, height);

    // Gradient from black to transparent
    const gradientFromBlackToTransparent = ctx.createLinearGradient(
      0,
      0,
      0,
      height
    );
    gradientFromBlackToTransparent.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradientFromBlackToTransparent.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradientFromBlackToTransparent;
    ctx.fillRect(0, 0, width, height);
  } else {
    // Create a gradient from hue to hue
    colorArray = []; // Reset color array
    for (let x = 0; x < height; x++) {
      const hue = (x / height) * 360;
      const colors = `hsl(${hue}, 100%, 50%)`;
      colorArray.push(colors);
      ctx.fillStyle = colors;
      ctx.fillRect(0, x, width, 1);
    }
  }
}

// Initialize gradients
colorGradients("color-picker-panal", "panal");
colorGradients("color-spectrum");

const canvas = document.getElementById("color-spectrum");
const pointer = document.getElementById("cursor-pointer");
const colorPick = document.getElementById("color-picker");

// Update pointer position and color on the spectrum canvas
const updatePointerandColor = (rect, yValue) => {
  // Determine color index based on vertical position
  const colorIndex = Math.round(
    (yValue / rect.height) * (colorArray.length - 1)
  );
  colorchange = colorArray[colorIndex];
  pointer.style.top = `${yValue - 5}px`;
  colorGradients("color-picker-panal", "panal");
  document.getElementById("preview").style.backgroundColor = colorchange;
};

// Track dragging state
let isDragging = false;

// Handle mouse down event on the spectrum canvas
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = canvas.getBoundingClientRect();
  const y = e.clientY - rect.top;
  updatePointerandColor(rect, y);
});

// Handle mouse move event for dragging
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y >= 0 && y <= rect.height) {
      updatePointerandColor(rect, y);
    }
  }
});

// Handle mouse up event to stop dragging
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Function to detect color at a given position on the panel canvas
const panalPicker = document.getElementById("color-picker-panal");
const panalCtx = panalPicker.getContext("2d");

const detectColor = (x, y) => {
  const imageData = panalCtx.getImageData(x, y, 1, 1);
  const data = imageData.data;
  const color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  return color;
};

// Handle click event on the panel canvas to pick color
panalPicker.addEventListener("click", (e) => {
  const rect = panalPicker.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  colorPick.style.left = `${e.clientX - rect.left - 7}px`;
  colorPick.style.top = `${e.clientY - rect.top - 6}px`;
  const color = detectColor(x, y);
  document.getElementById("preview").style.backgroundColor = color;
  const rgbFormate = (rgb) => {
    const match = rgb.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (match) {
      const r = parseInt(match[1], 10); // Red value
      const g = parseInt(match[2], 10); // Green value
      const b = parseInt(match[3], 10); // Blue value
      return { r, g, b };
    }
  };
  const rgbColor = rgbFormate(color);
  document.getElementById("r").value = rgbColor.r;
  document.getElementById("g").value = rgbColor.g;
  document.getElementById("b").value = rgbColor.b;
  const colors = rgbToCmykAndHex(rgbColor.r, rgbColor.g, rgbColor.b);
  document.getElementById("c").value = colors.cmyk.c;
  document.getElementById("m").value = colors.cmyk.m;
  document.getElementById("y").value = colors.cmyk.y;
  document.getElementById("k").value = colors.cmyk.k;
  document.getElementById("hex").value = colors.hex;
});

function rgbToCmykAndHex(r, g, b) {
  // Convert RGB to HEX
  const toHex = (x) => x.toString(16).padStart(2, "0").toUpperCase();
  const hex = `${toHex(r)}${toHex(g)}${toHex(b)}`;

  // Convert RGB to CMYK
  const rPercent = r / 255;
  const gPercent = g / 255;
  const bPercent = b / 255;

  const k = 1 - Math.max(rPercent, gPercent, bPercent);
  const c = (1 - rPercent - k) / (1 - k) || 0;
  const m = (1 - gPercent - k) / (1 - k) || 0;
  const y = (1 - bPercent - k) / (1 - k) || 0;

  const cmyk = {
    c: (c * 100).toFixed(2) + "%",
    m: (m * 100).toFixed(2) + "%",
    y: (y * 100).toFixed(2) + "%",
    k: (k * 100).toFixed(2) + "%",
  };

  return {
    hex,
    cmyk,
  };
}
