import React from "react";
import { countOfCells } from "../utilFunctions";

const GameBillboard = ({ gameInfo }) => {
  const blackPlayer = gameInfo.players.black;
  const whitePlayer = gameInfo.players.white;
  const blackPoints = countOfCells(gameInfo.table, "B");
  const whitePoints = countOfCells(gameInfo.table, "W");
  return (
    <div className="game-billboard">
      <div
        className={
          "game-billboard-data" + (gameInfo.playerTurn === "B" ? " active" : "")
        }
      >
        {blackPlayer}
        <span className="blackPoint">{blackPoints}</span>
      </div>
      <div
        className={
          "game-billboard-data" + (gameInfo.playerTurn === "W" ? " active" : "")
        }
      >
        {whitePlayer}
        <span className="whitePoint">{whitePoints}</span>
      </div>
    </div>
  );
};

export default GameBillboard;
