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
    console.log("moving player", data.playerMove);
    let { xStart, yStart, xEnd, yEnd } = data.playerMove;
    let movedFrom = document.getElementById(`${xStart}${yStart}`);
    let hex = movedFrom.innerHTML;
    movedFrom.innerHTML = null;
    let movedTo = document.getElementById(`${xEnd}${yEnd}`);
    movedTo.innerHTML = hex;
  } else {
    gameContainer.remove();

    drawBoard(data.board, boardContainer, getCoordinates);

    //this renders the buttons we need to click
    handleMoveSubmit(submitMoveHandler);
    handleReset();
    //we need to check the status of the checkbox

    function submitMoveHandler(e) {
      let checkmate = document.querySelector("input");
      checkmate = checkmate.checked;
      console.log('checkmate bool', checkmate);

      if (playerMove.xEnd && playerMove.yEnd) {
        socket.emit("playerMoved", {
          playerMove: playerMove,
          player1: data.player1,
          player2: data.player2,
          gameId: data.gameId,
          checkmate: checkmate
        });
        playerMove.reset();
        resetPlayerData();
      }
    }
  }
}

export default handleNewMove;
