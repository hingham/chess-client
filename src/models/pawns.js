import { ChessPieces } from "./chess-pieces.js";

class LightPawn extends ChessPieces {
  constructor(hex, xPos, yPos) {
    super(hex, xPos, yPos);
    this.validMoves = LightPawn.findMoves(xPos, yPos);
    this.validMoves[xPos].push(yPos + 2);
  }

  static findMoves(x, y) {
    let positions = {};
    if (y + 1 <= 8) {
      positions[x] = [y + 1];
    }
    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = LightPawn.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

class DarkPawn extends ChessPieces {
  constructor(hex, xPos, yPos) {
    super(hex, xPos, yPos);
    this.validMoves = DarkPawn.findMoves(xPos, yPos);
    this.validMoves[xPos].push(yPos - 2);
  }

  static findMoves(x, y) {
    let positions = {};
    if (y - 1 >= 1) {
      positions[x] = [y - 1];
    }
    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = DarkPawn.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

export let lightPawn1 = new LightPawn("&#9817;", 1, 2);
export let lightPawn2 = new LightPawn("&#9817;", 2, 2);
export let lightPawn3 = new LightPawn("&#9817;", 3, 2);
export let lightPawn4 = new LightPawn("&#9817;", 4, 2);
export let lightPawn5 = new LightPawn("&#9817;", 5, 2);
export let lightPawn6 = new LightPawn("&#9817;", 6, 2);
export let lightPawn7 = new LightPawn("&#9817;", 7, 2);
export let lightPawn8 = new LightPawn("&#9817;", 8, 2);

export let darkPawn1 = new DarkPawn("&#9823;", 1, 7);
export let darkPawn2 = new DarkPawn("&#9823;", 2, 7);
export let darkPawn3 = new DarkPawn("&#9823;", 3, 7);
export let darkPawn4 = new DarkPawn("&#9823;", 4, 7);
export let darkPawn5 = new DarkPawn("&#9823;", 5, 7);
export let darkPawn6 = new DarkPawn("&#9823;", 6, 7);
export let darkPawn7 = new DarkPawn("&#9823;", 7, 7);
export let darkPawn8 = new DarkPawn("&#9823;", 8, 7);
