import { ChessPieces } from "./chess-pieces.js";

class Rook extends ChessPieces {
  constructor(hex, xPos, yPos) {
    super(hex, xPos, yPos);
    this.validMoves = Rook.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};
    positions[x] = [1, 2, 3, 4, 5, 6, 7, 8].filter(val => val !== y);
    for (let i = 1; i <= 8; i++) {
      if (x !== i) {
        positions[i] = [y];
      }
    }

    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = Rook.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

export let lightRook1 = new Rook("&#9814;", 1, 1);
export let lightRook2 = new Rook("&#9814;", 8, 1);

export let darkRook1 = new Rook("&#9820;", 1, 8);
export let darkRook2 = new Rook("&#9820;", 8, 8);
