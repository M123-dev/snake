const tableSize = 35;

console.log('Resize')

function paintTable(){
let body = document.getElementById("body");

let windowSize = body.clientHeight;

if(body.clientWidth < body.clientHeight){
  console.log("Use width")
  windowSize = body.clientWidth;
}


console.log('Window size:' + windowSize);

let raw_size = windowSize / tableSize;
console.log('Raw size: ' + raw_size);
let trSize = Math.floor(raw_size);

console.log('TR Size' + trSize)

//Generate table

let htmlToAdd = "<table cellspacing='0' cellpadding='0' >";

htmlToAdd += "<score class='top-right' id='score'>Hallo</score>";

for (let y = tableSize - 1; y >= 0; y--) {
  htmlToAdd += "<tr>";
  for (let x = 0; x < tableSize; x++) {
                                   style="width: 20px;height: 40px"
    htmlToAdd += `<td id=${x}:${y} style="width:${trSize}px; height:${trSize}px"></td>`;
  }
  htmlToAdd += "</tr>";
}
htmlToAdd += "</table>";

htmlToAdd += '<input type="range" min="20" max="200" value= class="slider" id="intervalTime">';

body.innerHTML = htmlToAdd;
}

paintTable();
