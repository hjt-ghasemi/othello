import React, { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../context";
import config from "../config.json";
import {
  createTableWithHelp,
  createCopy,
  fillingCells,
  findClickedCell,
  renderTable,
  countOfCells,
  saveGameInLS,
} from "../utilFunctions";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import GameBillboard from "./gameBillboard";
import Winner from "./winner";

const Play = () => {
  const { gameInfo, setGameInfo } = useContext(GameContext);
  const canvasRef = useRef();
  const size = gameInfo.table.length;
  const cellSize = config.cellSize;
  const [showHelp, setShowHelp] = useState(true);
  const [end, setEnd] = useState(false);
  const tableWithHelp = createTableWithHelp(
    createCopy(gameInfo.table),
    gameInfo.playerTurn
  );
  const competitorTurn = gameInfo.playerTurn === "W" ? "B" : "W";

  const onPlay = ({ nativeEvent }) => {
    const [i, j] = findClickedCell(nativeEvent, size);

    if (tableWithHelp[i][j] !== "A") {
      toast.error("Invalid cell. Use help button to see valid cells.");
      return;
    }

    const editedTable = fillingCells(
      createCopy(gameInfo.table),
      i,
      j,
      gameInfo.playerTurn
    );

    setGameInfo({
      ...gameInfo,
      table: editedTable,
      playerTurn: competitorTurn,
    });
  };

  const onSave = () => {
    saveGameInLS({ ...gameInfo });
    toast.success("Game saved!");
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      renderTable(ctx, size, tableWithHelp, gameInfo.playerTurn, showHelp);
      if (countOfCells(tableWithHelp, "A") === 0) {
        if (
          countOfCells(
            createTableWithHelp(createCopy(gameInfo.table), competitorTurn),
            "A"
          ) !== 0
        ) {
          setGameInfo({ ...gameInfo, playerTurn: competitorTurn });
        } else {
          setEnd(true);
        }
      }
    }
  });

  if (gameInfo.matchId === "") {
    return <Redirect to="/new-game" />;
  }
  return (
    <React.Fragment>
      <div className="game-dashboard">
        <button className="btn" onClick={() => setShowHelp(!showHelp)}>
          Toggle Help
        </button>
        <GameBillboard gameInfo={gameInfo} />
        <button className="btn" onClick={onSave}>
          Save Game
        </button>
      </div>
      <div className="display-center" style={{ marginTop: "80px" }}>
        <div>
          <canvas
            ref={canvasRef}
            id="myCanvas"
            width={size * cellSize}
            height={size * cellSize}
            onClick={onPlay}
          ></canvas>
          <a className="my-link" href="https://github.com/hjt-ghasemi">
            created by hjt ghasemi
          </a>
        </div>
      </div>
      <Winner end={end} setEnd={setEnd} />
    </React.Fragment>
  );
};

export default Play;
