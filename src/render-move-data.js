let playerData = document.getElementById("player-data");
let userPlayFrom = document.createElement("p");
let userPlayTo = document.createElement("p");

export function getMoveData(dataHandler) {
  userPlayFrom.textContent = "Move from: ";
  userPlayTo.textContent = "Move to: ";
  playerData.appendChild(userPlayFrom);
  playerData.appendChild(userPlayTo);

  // create submit to submit the input and output
  let submit = document.createElement("button");
  submit.textContent = "Submit Move";
  playerData.appendChild(submit);
  submit.addEventListener("click", dataHandler);
}

export function resetMoveData() {
  userPlayFrom.textContent = "Move from: ";
  userPlayTo.textContent = "Move to: ";
}

