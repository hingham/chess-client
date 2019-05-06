export class ChessPieces {
  constructor(hex, xPos, yPos) {
    this.hex = hex;
    this.xPos = xPos;
    this.yPos = yPos;
    this.validMoves = null;
  }

  //sub classes should implement checkAndUpdate
  checkAndUpdate() {
    console.log("sub class must implement checkAndUpdate function");
    return false;
  }

  //sub classes should implement
  findMoves() {
    console.log("sub class must implement findMoves function");
  }

  changePosition(x1, y1, x2, y2, matrix) {
    let temp = matrix[y1][x1];
    console.log("temp");
    matrix[y1][x1] = null;
    matrix[y2][x2] = temp;
    // let movedFrom = document.getElementById(`${x1}${y1}`);
    // movedFrom.innerHTML = matrix[y1][x1];
    // let movedTo = document.getElementById(`${x2}${y2}`);
    // movedTo.innerHTML = matrix[y2][x2].hex;
    console.log("place it is moving", matrix[y2][x2]);
  }

  //check if the move exists in the possible move object
  checkAndMove(x2, y2, matrix) {
    if (this.validMoves.hasOwnProperty(x2)) {
      let yArr = this.validMoves[x2];
      console.log("valid x");
      if (yArr.indexOf(parseInt(y2)) >= 0) {
        console.log("valid x and y");
        this.changePosition(this.xPos, this.yPos, x2, y2, matrix);
        this.updatePos(x2, y2);
        return true;
      }
    }
    console.log("not valid move");
    return false;
  }

  //update the nodes position on the board
  updatePos(x2, y2) {
    this.xPos = parseInt(x2, 10);
    this.yPos = parseInt(y2, 10);
    console.log("new position ", this.xPos, this.yPos);
  }
}
