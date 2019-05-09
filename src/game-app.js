import io from "socket.io-client";

import showGames from "./show-games.js";
import handlePlayer2 from "./handle-player-2.js";
import handleNewMove from "./handle-new-move.js";
import showCanvasConfetti from "./canvas.js";
import showCanvasLoose from "./canvas-loose.js";
import rain from "./canvas-loose.js";

(function() {

  let gameContainer = document.getElementById("enter-game");
  let socket = io.connect("http://localhost:4000"),
    player,
    game;
  // let socket = io.connect("https://chess-match-server.herokuapp.com/"),
  //   player,
  //   game;

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

  socket.on("updateAvailableGames", data => {
    showGames(data.games, handleJoinGame);
  });

  socket.on("player1", data => {
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

  socket.on('checked', message =>{
    alert(message);
  });

  socket.on('winner', ()=>{
    showCanvasConfetti();
    alert('you won!!!');
  });

  socket.on('loose', ()=>{
    rain();
    alert('you lost :(');
  });
})();
