///the move object
const playerMove = {
  xStart: null,
  yStart: null,
  xEnd: null,
  yEnd: null,
  reset() {
    this.xStart = null;
    this.yStart = null;
    this.xEnd = null;
    this.yEnd = null;
  }
};

let moveContainer = document.getElementById("player-move");

let userPlayFrom = document.createElement("p");
userPlayFrom.textContent = "At: ";

let userPlayTo = document.createElement("p");
userPlayTo.textContent = "To: ";

moveContainer.appendChild(userPlayFrom);
moveContainer.appendChild(userPlayTo);

function handleMoveSubmit(dataHandler) {
  // create submit to submit the input and output
  let submit = document.createElement("button");
  submit.textContent = "Submit Move";
  moveContainer.appendChild(submit);
  submit.addEventListener("click", dataHandler);
}

// returns the player object with the move values
function getCoordinates(e) {
  e.preventDefault();
  console.log("the target id: ", e.target.id.split(""));
  let coordinate = e.target.id.split("").map(val => parseInt(val, 10));
  let xLetter = String.fromCharCode(coordinate[0] + 96);
  let yNum = -1 * coordinate[1] + 9;

  if (playerMove.xStart === null) {
    playerMove.xStart = coordinate[0];
    playerMove.yStart = coordinate[1];
    appendTextNode(userPlayFrom, yNum, xLetter);
  } else if (playerMove.xEnd === null) {
    playerMove.xEnd = coordinate[0];
    playerMove.yEnd = coordinate[1];
    appendTextNode(userPlayTo, yNum, xLetter);
  }
}

function appendTextNode(appendTo, row, col) {
  let textNode = document.createTextNode(`${row}, ${col}`);
  appendTo.appendChild(textNode);
}

function resetPlayerData() {
  userPlayFrom.textContent = "At: ";
  userPlayTo.textContent = "To: ";
}

// function renderPlayerTurnData() {
//   let data = document.getElementById("player-data");
//   data.innerHTML = "";
//   let h3 = document.createElement("h3");
//   h3.textContent = "Making a Move:";
//   let p = document.createElement("p");
//   p.textContent = `Click piece you want to move. Then, click where would like to move.
// If the move is vaild, the board will be updated.`;
//   data.appendChild(h3);
//   data.appendChild(p);

//   let userPlayFrom = document.createElement("p");
//   userPlayFrom.textContent = "At: ";

//   let userPlayTo = document.createElement("p");
//   userPlayTo.textContent = "To: ";

//   data.appendChild(userPlayFrom);
//   data.appendChild(userPlayTo);
// }

export { getCoordinates, playerMove, resetPlayerData, handleMoveSubmit };
