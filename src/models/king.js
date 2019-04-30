import { ChessPieces } from "./chess-pieces.js";

class King extends ChessPieces {
  constructor(hex, xPos, yPos) {
    super(hex, xPos, yPos);
    this.validMoves = King.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};

    positions[x] = [y + 1, y - 1].filter(val => val > 0 && val <= 8);

    if (x + 1 <= 8) {
      //sideways, sidways and up
      positions[x + 1] = [y - 1, y, y + 1].filter(val => val > 0 && val <= 8);
    }
    if (x - 1 <= 8) {
      positions[x - 1] = [y - 1, y, y + 1].filter(val => val > 0 && val <= 8);
    }
    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = King.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

export let lightKing = new King("&#9813;", 5, 1);
export let darkKing = new King("&#9819;", 4, 8);
