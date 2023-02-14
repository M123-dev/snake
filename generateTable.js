const tableSize = 34;

console.log('Resize')

let body = document.getElementById("body");

let windowSize = body.clientHeight;

if(body.clientWidth < body.clientHeight){
  console.log("Use width")
  windowSize = body.innerWidth;
}


console.log(windowSize);

let raw_size = windowSize / tableSize;
console.log(raw_size);
let trSize = Math.floor(raw_size);

console.log(trSize)

//Generate table

let htmlToAdd = "<table>";

htmlToAdd += "<score class='top-right' id='score'>Hallo</score>";

for (let y = tableSize - 1; y > 0; y--) {
  htmlToAdd += "<tr>";
  for (let x = 0; x < tableSize; x++) {
                                   style="width: 20px;height: 40px"
    htmlToAdd += `<td id=${x}:${y} style="width:${trSize}px; height:${trSize}px"></td>`;
  }
  htmlToAdd += "</tr>";
}
htmlToAdd += "</table>";
body.innerHTML = htmlToAdd;
