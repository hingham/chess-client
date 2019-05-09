import {
  getCoordinates,
  handleMoveSubmit,
  playerMove,
  handleReset,
  resetPlayerData
} from "./get-coordinates.js";
import drawBoard from "./draw-board.js";

//draws the board to ready the game for both players
//emits "playerMove" with the player move data
//socket emit is attached to click event on button; sent to server when player submits their move
//server will determine if the move is valid and send appropriate data back
function handleNewMove(data, socket) {
  let gameContainer = document.getElementById("enter-game");
  let boardContainer = document.querySelector("section");

  if (data.playerMove !== null) {
    let { xStart, yStart, xEnd, yEnd } = data.playerMove;
    let movedFrom = document.getElementById(`${xStart}${yStart}`);
    let hex = movedFrom.innerHTML;
    movedFrom.innerHTML = null;
    let movedTo = document.getElementById(`${xEnd}${yEnd}`);
    movedTo.innerHTML = hex;
  } else {
    gameContainer.remove();

    let app = document.getElementById("app");
    let boardContainer = document.createElement("div");
    boardContainer.setAttribute("id", "chessboard");
    app.appendChild(boardContainer);

    drawBoard(data.board, boardContainer, getCoordinates);

    //render buttons to click to submit move
    handleMoveSubmit(submitMoveHandler);
    handleReset();

    function submitMoveHandler(e) {
      let check = document.querySelector("input");
      check = check.checked;

      if (playerMove.xEnd && playerMove.yEnd) {
        socket.emit("playerMoved", {
          playerMove: playerMove,
          player1: data.player1,
          player2: data.player2,
          gameId: data.gameId,
          check: check
        });
        playerMove.reset();
        resetPlayerData();
      }
    }
  }
}

export default handleNewMove;
