import io from "socket.io-client";

(function() {
  console.log("iffe");

  let socket = io.connect("http://localhost:4000"),
    player,
    game;

  //create a new game. emit newGame event

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

    socket.emit("createGame", { name: name });
    //create a new player on the back end or the front end???
  }

  socket.on("newGame", data => {
    //display this message as appropriate
    let message = `hello ${
      data.name
    }. Please ask your friend to enter the game ID: ${
      data.room
    }. Waiting for your opponent to join.`;

    let gameContainer = document.getElementById("game-container");
    let gameId = document.createElement("p");
    gameId.textContent = `${data.room}`;
    gameContainer.appendChild(gameId);

    //should maybe just update the UI here to show possible game id's with the name of the player

    //could i get the game from the game object?
    // game = data.game;
  });

  function handleJoinGame(e) {
    e.preventDefault();
    console.log("trying to join a game");
    //click the game they would like to join, then be prompted to enter in their name
    let roomId = e.target.value;
    //need to somehow get the name of the user
    let name = "player2";
    socket.emit("joinGame", { name: name, room: roomId });
  }

  socket.on("player1", data => {
    //do something with the message
    let message = `Hello, ${data.name}`;
    //create a new game for player 1
  });

  socket.on("player2", data => {
    //do something with the message
    let message = `Hello, ${data.name}`;
    //create a new game for player 2
  });
})();
