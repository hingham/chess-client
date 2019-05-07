function handlePlayer2(data, socket) {
    let gameContainer = document.getElementById("enter-game");

    let text1 = document.createElement("h3");
    text1.textContent = `You've joined ${data.name}'s game!`;

    let text2 = document.createElement("h3");
    text2.textContent = `Please enter your name below:`;

    let form = document.createElement('form');

    let input = document.createElement("input");
    input.setAttribute("id", "player-2-name");

    let button = document.createElement("button");
    button.setAttribute('type', 'submit');
    button.textContent = "Enter Game";

    gameContainer.innerHTML = "";
    gameContainer.appendChild(text1);
    gameContainer.appendChild(text2);
    gameContainer.appendChild(form);
    form.appendChild(input);
    form.appendChild(button);

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
  }

  export default handlePlayer2;