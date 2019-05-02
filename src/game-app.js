import io from "socket.io-client";
import drawBoard from "./draw-board.js";
import matrix from "./board.js";
import {playerMove, getCoordinates, resetPlayerData} from "./get-coordinates.js";
// import from "./get-coordinates.js"

(function() {
  console.log("iffe");

  let gameContainer = document.getElementById("enter-game");
  let socket = io.connect("http://localhost:4000"),
    player,
    game;

  var boardContainer = document.querySelector("section");

  let newGame = document.getElementById("new-game");
  newGame.addEventListener("click", handleNewGame);

  let joinGame = document.getElementById("game-container");
  joinGame.addEventListener("click", handleJoinGame);

  function handleNewGame(e) {
    e.preventDefault();
    console.log("player 1 name");

    let name = document.getElementById("player-1-name").value;
    console.log(name);
    if (!name) {
      //alert notice to enter the name
    }
    socket.emit("createGame", { name: name, room: name});
  }

  socket.on("connectToNewGame", data => {
    //display this message as appropriate
    console.log('data, ', data);
    let gameId = document.createElement("p");
    gameId.setAttribute("id", data.name);
    gameId.textContent = `Join ${data.name}'s game!`;
    joinGame.appendChild(gameId);
  });

  function handleJoinGame(e) {
    e.preventDefault();
    //click the game they would like to join, then be prompted to enter in their name
    let roomId = e.target.id;
    console.log("trying to join a game with id: ", roomId);

    let name = "player2";
    socket.emit("joinGame", {room: roomId, name: roomId});
  }

  socket.on("player1", data => {
    console.log('player 1 screen');
    document.getElementById('enter-game').innerHTML = "waiting for your opponent to join your game...";
  });

  socket.on("player2", data => {
    console.log('player 2 screen');
    
    let text1 = document.createElement('h3');
    text1.textContent = `You've joined ${data.name}'s game!`;;

    let text2 = document.createElement('h3');
    text2.textContent = `Please enter your name below:`

    let input = document.createElement('input');
    input.setAttribute('id', 'player-2-name');

    let button = document.createElement('button');
    button.textContent = "Enter Game"

    gameContainer.innerHTML = '';
    gameContainer.appendChild(text1);
    gameContainer.appendChild(text2);
    gameContainer.appendChild(input);
    gameContainer.appendChild(button);

    button.addEventListener('click', (e)=>{
      e.preventDefault();
      let player2Name = document.getElementById('player-2-name').value;
      if(player2Name){
        console.log(player2Name);
        socket.emit('bothPlayersJoined', {room: data.name, player1: data.name, player2: player2Name});
      }
    })
  });

  socket.on('drawBoard', game=>{
    console.log('the game', game);
    newGame.remove();

    drawBoard(game.board, boardContainer, getCoordinates);
    
    let playerData = document.getElementById("player-data");
    let userPlayFrom = document.createElement("p");
    userPlayFrom.textContent = "Move from: ";
    let userPlayTo = document.createElement("p");
    userPlayTo.textContent = "Move to: ";
    playerData.appendChild(userPlayFrom);
    playerData.appendChild(userPlayTo);

    // create submit to submit the input and output
    let submit = document.createElement("button");
    submit.textContent = "Submit Move";
    playerData.appendChild(submit);
    submit.addEventListener("click", submitMoveHandler);

    function submitMoveHandler(e) {
      if(playerMove.xEnd && playerMove.yEnd){
        game.playerMove = playerMove;
        socket.emit('playerMoved', {playerMove: game.playerMove, roomId: game.roomId});
        playerMove.reset();   
        resetPlayerData();
      }
    }
  });
})();

