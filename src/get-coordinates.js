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
  // let form = document.createElement('form');

  let div = document.createElement('div');

  let label = document.createElement('label');
  label.textContent = 'Checkmate'
  
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', 'Checkmake');
  div.appendChild(label);
  div.appendChild(checkbox);

  let submit = document.createElement("button");
  submit.setAttribute('type', 'submit');
  submit.textContent = "Submit Move";
  
  // moveContainer.appendChild(label);
  // moveContainer.appendChild(checkbox);
  moveContainer.appendChild(div);
  moveContainer.appendChild(submit);
  // moveContainer.appendChild(form);
  
  submit.addEventListener("click", dataHandler);
}

function handleReset(playerMove) {
  // create rest to rest the playerMove
  let submit = document.createElement("button");
  submit.textContent = "Reset";
  moveContainer.appendChild(submit);
  submit.addEventListener("click", ()=>resetPlayerData() );
}

// returns the player object with the move values
function getCoordinates(e) {
  e.preventDefault();
  console.log("the target id: ", e.target.id.split(""));
  let coordinate = e.target.id.split("").map(val => parseInt(val, 10));
  coordinate.filter(val=> val * 0 === 0);

  if(coordinate.length < 2) return;

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
  playerMove.reset();
}

export { getCoordinates, playerMove, resetPlayerData, handleMoveSubmit, handleReset };
