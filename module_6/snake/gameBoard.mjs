"use strict";

import { EDirection } from "./snake.mjs";


export const GameBoardSize = { Cols: 24, Rows: 18 };

export const EBoardCellInfoType = { Empty: 0, Snake: 1, Bait: 2 };

export class TBoardCell {
  constructor(aCol, aRow) {
    this.col = aCol;
    this.row = aRow;
  }
}// End off class TBoardCell
//------------------------------------------------------------------------------------------

export class TBoardCellInfo {
  constructor() {
    this.direction = EDirection.Right;
    this.infoType = EBoardCellInfoType.Empty;
  }
}// End off class TBoardCellInfo
//------------------------------------------------------------------------------------------

export class TGameBoard {
  constructor() {
    this.cols = GameBoardSize.Cols;
    this.rows = GameBoardSize.Rows;
    this.gameBoard = [];

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new TBoardCellInfo());
      }
      this.gameBoard.push(row);
    }
  } // End of constructor

  getCell(aRow, aCol) {
    if (aRow < 0 || aRow >= this.rows || aCol < 0 || aCol >= this.cols) {
      return null;
    }
    return this.gameBoard[aRow][aCol];
  } // End of getCell
  
}// End of class TGameBoard
//------------------------------------------------------------------------------------------