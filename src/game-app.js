import io from "socket.io-client";
import drawBoard from "./draw-board.js";
// import {getMoveData, resetMoveData} from "./render-move-data.js"
import {
  playerMove,
  getCoordinates,
  resetPlayerData,
  handleMoveSubmit,
  renderPlayerTurnData
} from "./get-coordinates.js";
// import from "./get-coordinates.js"

(function() {
  console.log("iffe");

  let gameContainer = document.getElementById("enter-game");
  let socket = io.connect("http://localhost:4000"),
    player,
    game;

  let boardContainer = document.querySelector("section");

  let newGame = document.getElementById("new-game");
  newGame.addEventListener("click", handleNewGame);

  let joinGame = document.getElementById("game-container");
  // joinGame.addEventListener("click", handleJoinGame);

  function handleNewGame(e) {
    e.preventDefault();
    console.log("player 1 name");

    let name = document.getElementById("player-1-name").value;
    console.log(name);
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    socket.emit("createGame", { name: name, room: name });
  }

  socket.on("connectToNewGame", data => {
    //display this message as appropriate
    let heading = document.querySelector("h4");
    heading.textContent = "Join a existing game";
    let gameId = document.createElement("p");
    gameId.setAttribute("id", data.name);
    gameId.textContent = `${data.name[0].toUpperCase()}${data.name.slice(
      1
    )}'s game!`;
    gameId.addEventListener("click", handleJoinGame);
    joinGame.appendChild(gameId);
  });

  function handleJoinGame(e) {
    e.preventDefault();
    //click the game they would like to join, then be prompted to enter in their name
    let roomId = e.target.id;
    console.log("trying to join a game with id: ", roomId);

    // let name = "player2";
    socket.emit("joinGame", { room: roomId, name: roomId });
  }

  socket.on("player1", data => {
    console.log("player 1 screen");
    document.getElementById("enter-game").innerHTML =
      "waiting for your opponent to join your game...";
    document.querySelector("body").setAttribute("class", "background-white");
  });

  socket.on("player2", data => {
    console.log("player 2 screen", "socket1", data.socket1);

    let text1 = document.createElement("h3");
    text1.textContent = `You've joined ${data.name}'s game!`;

    let text2 = document.createElement("h3");
    text2.textContent = `Please enter your name below:`;

    let input = document.createElement("input");
    input.setAttribute("id", "player-2-name");

    let button = document.createElement("button");
    button.textContent = "Enter Game";

    gameContainer.innerHTML = "";
    gameContainer.appendChild(text1);
    gameContainer.appendChild(text2);
    gameContainer.appendChild(input);
    gameContainer.appendChild(button);

    button.addEventListener("click", e => {
      e.preventDefault();
      let player2Name = document.getElementById("player-2-name").value;
      if (player2Name) {
        console.log(player2Name);
        socket.emit("bothPlayersJoined", {
          room: data.name,
          socket1: data.socket1,
          player1: data.name,
          socket2: socket.id,
          player2: player2Name
        });
      }
    });
  });

  // game obj {gameId: name, board: matrix, playerMove: player Move Obj, player1: name, player2: name }
  socket.on("drawBoard", data => {
    console.log("the game", data, "the socket", socket.id, 'player move', data.playerMove);
    let heading = document.querySelector("h2");
    heading.textContent = `${data.player1.toUpperCase()} vs ${data.player2.toUpperCase()}`;
    if (data.playerMove !== null) {
      console.log("moving player", data.playerMove);
      let { xStart, yStart, xEnd, yEnd } = data.playerMove;
      let movedFrom = document.getElementById(`${xStart}${yStart}`);
      let hex = movedFrom.innerHTML;
      movedFrom.innerHTML = null;
      let movedTo = document.getElementById(`${xEnd}${yEnd}`);
      movedTo.innerHTML = hex;
    } else {
      newGame.remove();
      gameContainer.remove();

      drawBoard(data.board, boardContainer, getCoordinates);
      handleMoveSubmit(submitMoveHandler);

      function submitMoveHandler(e) {
        if (playerMove.xEnd && playerMove.yEnd) {
          // data.playerMove = playerMove;
          socket.emit("playerMoved", {
            playerMove: playerMove,
            player1: data.player1,
            player2: data.player2,
            gameId: data.gameId
          });
          playerMove.reset();
          resetPlayerData();
        }
      }
    }
  });

  socket.on("wait", () => {
    let data = document.getElementById('player-move');
    data.setAttribute('class', 'hidden');
    let wait = document.getElementById('wait');
    wait.setAttribute('class', '');
  });

  socket.on("go", () => {
    let wait = document.getElementById('wait');
    wait.setAttribute('class', 'hidden');
    let data = document.getElementById('player-move');
    data.setAttribute('class', '');
  });

  socket.on("unvalidMove", message => {
    alert(message);
  });
})();
