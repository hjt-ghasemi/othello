import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../context";
import { countOfCells, addResultToLS } from "../utilFunctions";

const Winner = ({ end }) => {
  const { gameInfo, setGameInfo } = useContext(GameContext);

  if (!end) return null;

  const whitePoints = countOfCells(gameInfo.table, "W");
  const blackPoints = countOfCells(gameInfo.table, "B");
  let winner = "both of you";
  const { white, black } = gameInfo.players;

  if (whitePoints > blackPoints) {
    winner = white;
    addResultToLS(white, "win");
    addResultToLS(black, "loss");
  } else if (blackPoints > whitePoints) {
    winner = black;
    addResultToLS(black, "win");
    addResultToLS(white, "loss");
  } else {
    addResultToLS(white, "draw");
    addResultToLS(black, "draw");
  }

  return (
    <div className="overal">
      <div>
        <h1>
          Congratulations to <br />{" "}
          <span className="text-capitalize" style={{ color: "greenyellow" }}>
            {winner}
          </span>
          <br />
          You have won
        </h1>
        <Link
          to="/new-game"
          className="new-game-link"
          onClick={() => {
            setGameInfo({ ...gameInfo, matchId: "" });
          }}
        >
          Start New Game
        </Link>
      </div>
    </div>
  );
};

export default Winner;
