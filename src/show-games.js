
function showGames(games, eventListener) {
let joinGame = document.getElementById("game-container");
  console.log("show games", games);
  joinGame.innerHTML = "";

  if (Object.keys(games).length > 0){
    let heading = document.createElement("h4");
    heading.textContent = "Join a existing game: ";
    joinGame.appendChild(heading);

    for (let game in games) {
      let gameId = document.createElement("p");
      gameId.setAttribute("id", game);
      gameId.textContent = `${game[0].toUpperCase()}${game.slice(1)}'s game!`;
      gameId.addEventListener("click", eventListener);
      joinGame.appendChild(gameId);
    }
  }
}

export default showGames;