import {
  lightKnight1,
  lightKnight2,
  darkKnight1,
  darkKnight2
} from "./models/knight.js";

import * as p from "./models/pawns.js";
import * as r from "./models/rook.js";
import * as b from "./models/bishop.js";
import * as k from "./models/king.js";
import * as q from "./models/queen.js";

export default [
  [null, 1, 2, 3, 4, 5, 6, 7, 8],
  [
    1,
    r.lightRook1,
    lightKnight1,
    b.lightBishop1,
    q.lightQueen,
    k.lightKing,
    b.lightBishop2,
    lightKnight2,
    r.lightRook2
  ],
  [
    2,
    p.lightPawn1,
    p.lightPawn2,
    p.lightPawn3,
    p.lightPawn4,
    p.lightPawn5,
    p.lightPawn6,
    p.lightPawn7,
    p.lightPawn8
  ],
  [3, null, null, null, null, null, null, null, null],
  [4, null, null, null, null, null, null, null, null],
  [5, null, null, null, null, null, null, null, null],
  [6, null, null, null, null, null, null, null, null],
  [
    7,
    p.darkPawn1,
    p.darkPawn2,
    p.darkPawn3,
    p.darkPawn4,
    p.darkPawn5,
    p.darkPawn6,
    p.darkPawn7,
    p.darkPawn8
  ],
  [
    8,
    r.darkRook1,
    darkKnight1,
    b.darkBishop1,
    k.darkKing,
    q.darkQueen,
    b.darkBishop2,
    darkKnight2,
    r.darkRook2
  ]
];
