const panal = document.getElementById("panal-container");

function handleClick() {
  panal.classList.remove("hidden");
}

function handleCancel() {
  panal.classList.add("hidden");
}

function handleOk() {
  const color = document.getElementById("hex").value;
  console.log(color);
  document.getElementById(`bg`).style.backgroundColor = `#${color}`;
  panal.classList.add("hidden");
}

function determineColor(hex) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error("Invalid HEX color format. Use #RRGGBB format.");
  }

  // Convert HEX to RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  if (r === 255 && g === 255 && b === 255) {
    return "white";
  } else if (r === 0 && g === 0 && b === 0) {
    return "black";
  } else {
    return undefined; // Return undefined if the color is neither white nor black
  }
}
