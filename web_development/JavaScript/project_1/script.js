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

const copy = document.getElementById("copy")
copy.addEventListener("click", () => {
  const texttoCopy = document.getElementById("hex").value
  const text = `#${texttoCopy}`
  navigator.clipboard.writeText(text)
})

function rgbClick(){
  const r = document.getElementById("r").value
  const g = document.getElementById("g").value
  const b = document.getElementById("b").value
  const text = `rgb(${r}, ${g}, ${b})`
  navigator.clipboard.writeText(text)
}
function cmykClick(){
  const c = document.getElementById("c").value
  const m = document.getElementById("m").value
  const y = document.getElementById("y").value
  const k = document.getElementById("k").value
  const text = `cmyk(${c}, ${m}, ${y}, ${k})`
  navigator.clipboard.writeText(text)
}