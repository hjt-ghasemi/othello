import React, { useContext, useState } from "react";
import { GameContext } from "../context";
import { createTable } from "../utilFunctions";

const NewGame = ({ history }) => {
  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");
  const [size, setSize] = useState(8);

  const { setGameInfo } = useContext(GameContext);

  const onStartGame = () => {
    setGameInfo({
      players: { white: white.trim(), black: black.trim() },
      table: createTable(size),
      playerTurn: "B",
      matchId: Date.now(),
    });
    history.push("/play");
  };

  return (
    <React.Fragment>
      <div className="display-center">
        <div className="new-game-form">
          <div className="form-group">
            <label htmlFor="black">PLAYER OF BLACK</label>
            <input
              className="form-control my-2"
              id="black"
              placeholder="Akbar"
              name="blackName"
              value={black}
              onChange={(e) => setBlack(e.currentTarget.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="white">PLAYER OF WHITE</label>
            <input
              className="form-control mt-2"
              id="white"
              placeholder="Akram"
              name="whiteName"
              value={white}
              onChange={(e) => setWhite(e.currentTarget.value)}
            />
          </div>
          <hr />
          <div className="form-group mb-3">
            <label htmlFor="tableSize">TABLE SIZE</label>
            <select
              id="tableSize"
              className="form-control mt-2"
              name="size"
              value={size}
              onChange={(e) => setSize(e.currentTarget.value)}
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn"
            disabled={!(white && black)}
            onClick={onStartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewGame;
