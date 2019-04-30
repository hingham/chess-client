import { ChessPieces } from "./chess-pieces.js";

class Bishop extends ChessPieces {
  constructor(hex, xPos, yPos) {
    super(hex, xPos, yPos);
    this.validMoves = Bishop.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};
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
      this.validMoves = Bishop.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

export let lightBishop1 = new Bishop("&#9815;", 3, 1);
export let lightBishop2 = new Bishop("&#9815;", 6, 1);

export let darkBishop1 = new Bishop("&#9821;", 3, 8);
export let darkBishop2 = new Bishop("&#9821;", 6, 8);
