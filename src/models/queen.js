import { ChessPieces } from "./chess-pieces.js";

class Queen extends ChessPieces {
  constructor(hex, xPos, yPos) {
    super(hex, xPos, yPos);
    this.validMoves = Queen.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};
    //can move move like rook
    positions[x] = [1, 2, 3, 4, 5, 6, 7, 8].filter(val => val !== y);
    for (let i = 1; i <= 8; i++) {
      if (x !== i) {
        positions[i] = [y];
      }
    }

    for (let i = 0; i < 8; i++) {
      if (x + i !== x && x + i <= 8 && y + i <= 8) {
        positions[x + i] = [y + i];
      }
      if (x + i !== x && x + i <= 8 && y - i > 0) {
        positions[x + i] = [y - i];
      }
      if (x - i !== x && x - i > 0 && y + i <= 8) {
        positions[x - i] = [y + i];
      }
      if (x - i !== x && x - i > 0 && y - i > 0) {
        positions[x - i] = [y - i];
      }
    }

    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = Queen.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

export let lightQueen = new Queen("&#9812;", 4, 1);
export let darkQueen = new Queen("&#9818", 5, 8);
