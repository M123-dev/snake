const tableSize = 15;

const w = window.innerWidth;
let windowSize = window.innerHeight;
if (w < windowSize) {
  windowSize = w;
}
let trSize = Math.floor(windowSize / tableSize);

//Generate table
let body = document.getElementById("body");
let htmlToAdd = "<table>";

htmlToAdd += "<score class='top-right' id='score'>Hallo</score>";

for (let y = tableSize - 1; y > 0; y--) {
  htmlToAdd += "<tr>";
  for (let x = 0; x < tableSize; x++) {
    htmlToAdd += `<td id=${x}:${y} width="${trSize}" height="${trSize}"></td>`;
  }
  htmlToAdd += "</tr>";
}
htmlToAdd += "</table>";
body.innerHTML = htmlToAdd;
