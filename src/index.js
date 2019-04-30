import "./styles.css";

import boardMatrix from "./board.js";
import { spawn } from "child_process";
import renderBoard from "./draw-board.js";
import "./game-app.js";
// import { player1, player2 } from "./app.js";

//store parent node
var board = document.querySelector("section");

// renderBoard(boardMatrix, board, getCoordinates);

// board.addEventListener("click", getCoordinates);

///the move object
let playerMove = {
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

// let body = document.querySelector("div");
let playerData = document.getElementById("player-data");

let userPlayFrom = document.createElement("p");
userPlayFrom.textContent = "Move from: ";

let userPlayTo = document.createElement("p");
userPlayTo.textContent = "Move to: ";

playerData.appendChild(userPlayFrom);
playerData.appendChild(userPlayTo);

////////////
// create submit to submit the input and output
let submit = document.createElement("button");
submit.textContent = "Submit Move";
playerData.appendChild(submit);
submit.addEventListener("click", clickHandler);

function getCoordinates(e) {
  e.preventDefault();
  console.log("the target id: ", e.target.id.split(""));
  let coordinate = e.target.id.split("");
  if (playerMove.xStart === null) {
    playerMove.xStart = parseInt(coordinate[0], 10);
    playerMove.yStart = parseInt(coordinate[1], 10);
    appendTextNode(userPlayFrom, playerMove.yStart, playerMove.xStart);
  } else if (playerMove.xEnd === null) {
    playerMove.xEnd = parseInt(coordinate[0], 10);
    playerMove.yEnd = parseInt(coordinate[1], 10);
    appendTextNode(userPlayTo, playerMove.yEnd, playerMove.xEnd);
  }
}

function clickHandler(e) {
  e.preventDefault();
  if (
    boardMatrix[playerMove.yStart][playerMove.xStart] &&
    playerMove.xEnd !== null
  ) {
    if (boardMatrix[playerMove.yEnd][playerMove.xEnd] !== null) {
      alert("That space is already occupied. Please try again");
    } else {
      // returns boolean true if piece was successfully moved
      player1.move(boardMatrix, playerMove);
      let moved = boardMatrix[playerMove.yStart][
        playerMove.xStart
      ].checkAndUpdate(playerMove.xEnd, playerMove.yEnd, boardMatrix);

      if (!moved) {
        alert("Not a valid move, please try again.");
      }
    }
  } else {
    alert("There is no piece on the board at that position. Please try again.");
  }
  playerMove.reset();
  resetPlayerData();
}

function resetPlayerData() {
  userPlayFrom.textContent = "Move from: ";
  userPlayTo.textContent = "Move to: ";
}

function appendTextNode(appendTo, row, col) {
  let textNode = document.createTextNode(`row = ${row}, col=${col}`);
  appendTo.appendChild(textNode);
}
