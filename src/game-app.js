import io from "socket.io-client";

import showGames from "./show-games.js";
import handlePlayer2 from "./handle-player-2.js";
import handleNewMove from "./handle-new-move.js";

(function() {
  console.log("iffe");

  let gameContainer = document.getElementById("enter-game");
  let socket = io.connect("http://localhost:4000"),
    player,
    game;

  let boardContainer = document.querySelector("section");

  let newGame = document.getElementById("new-game");
  newGame.addEventListener("click", handleNewGame);

  socket.on("showGames", games => {
    showGames(games, handleJoinGame);
  });

  function handleNewGame(e) {
    e.preventDefault();
    let name = document.getElementById("player-1-name").value;
    if (!name) {
      return alert("Please enter your name.");
    }
    socket.emit("createGame", { name: name, room: name });
  }

  socket.on("connectToNewGame", data => {
    showGames(data.games, handleJoinGame);
  });

  //select the game they would like to join
  function handleJoinGame(e) {
    e.preventDefault();
    let roomId = e.target.id;
    socket.emit("joinGame", { room: roomId, name: roomId });
  }

  socket.on("removeGame", data => {
    console.log('remove', data);
    let game = document.getElementById(data.gameId);
    game.remove();
  });

  socket.on("player1", data => {
    console.log("player 1 screen");
    document.getElementById("enter-game").innerHTML =
      "waiting for your opponent to join your game...";
    document.querySelector("body").setAttribute("class", "background-white");
  });

  socket.on("player2", data => {
    handlePlayer2(data, socket);
  });

  // game obj {gameId: name, board: matrix, playerMove: player Move Obj, player1: name, player2: name }
  socket.on("drawBoard", data => {
    let heading = document.querySelector("h2");
    heading.textContent = `${data.player1.toUpperCase()} vs ${data.player2.toUpperCase()}`;
    handleNewMove(data, socket);

    // function handleNewMove(data, socket) {
    //   let gameContainer = document.getElementById("enter-game");
    //   let boardContainer = document.querySelector("section");

    //   if (data.playerMove !== null) {
    //     console.log("moving player", data.playerMove);
    //     let { xStart, yStart, xEnd, yEnd } = data.playerMove;
    //     let movedFrom = document.getElementById(`${xStart}${yStart}`);
    //     let hex = movedFrom.innerHTML;
    //     movedFrom.innerHTML = null;
    //     let movedTo = document.getElementById(`${xEnd}${yEnd}`);
    //     movedTo.innerHTML = hex;
    //   } else {
    //     newGame.remove();
    //     gameContainer.remove();

    //     drawBoard(data.board, boardContainer, getCoordinates);
    //     handleMoveSubmit(submitMoveHandler);
    //     handleReset();

    //     function submitMoveHandler(e) {
    //       if (playerMove.xEnd && playerMove.yEnd) {
    //         socket.emit("playerMoved", {
    //           playerMove: playerMove,
    //           player1: data.player1,
    //           player2: data.player2,
    //           gameId: data.gameId
    //         });
    //         playerMove.reset();
    //         // resetPlayerData();
    //       }
    //     }
    //   }
    // }
  });

  socket.on("wait", () => {
    let data = document.getElementById("player-move");
    data.setAttribute("class", "hidden");
    let wait = document.getElementById("wait");
    wait.setAttribute("class", "");
  });

  socket.on("go", () => {
    let wait = document.getElementById("wait");
    wait.setAttribute("class", "hidden");
    let data = document.getElementById("player-move");
    data.setAttribute("class", "");
  });

  socket.on("unvalidMove", message => {
    alert(message);
  });
})();
