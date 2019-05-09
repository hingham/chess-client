export default function(boardMatrix, boardContainer, eventCallback) {
  document.getElementById('directions').remove();
  for (let i = 0; i < boardMatrix.length; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "rowContainer");

    for (let j = 0; j < boardMatrix[i].length; j++) {
      let square = document.createElement("span");
      square.setAttribute("id", `${j}${i}`);
      if (boardMatrix[i][j] && boardMatrix[i][j].hex) {
        square.innerHTML = boardMatrix[i][j].hex;
      }
      if (i === 0) {
        square.innerHTML = boardMatrix[i][j];
        square.setAttribute('class', 'white');
      }else if (j===0){
        square.innerHTML = -1 * boardMatrix[i][j] + 9;
        square.setAttribute('class', 'white');

      } 
      else if (i % 2 === 0) {
        j % 2 === 0
          ? square.setAttribute("class", "black")
          : square.setAttribute("class", "salmon");
      } else {
        j % 2 === 0
          ? square.setAttribute("class", "salmon")
          : square.setAttribute("class", "black");
      }
      square.setAttribute('tabindex', '0');
      row.appendChild(square);
    }
    document.getElementById('player-move').setAttribute('class', '');
    boardContainer.appendChild(row);
    boardContainer.addEventListener("click", eventCallback);
    boardContainer.addEventListener("keypress", eventCallback);

  }
}
