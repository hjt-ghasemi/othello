import React from "react";
import moment from "moment";
import { countOfCells } from "../utilFunctions";

const LoadGame = ({ history, setGameInfo }) => {
  let games = JSON.parse(localStorage.getItem("games"));

  if (!games || games.length === 0) {
    return (
      <div className="display-center">
        <h1 className="LS-header">
          There is no saved game in browser storage yet.
          <br />
          Make sure that localStorage is available.
        </h1>
      </div>
    );
  }

  const loadGame = (game) => {
    setGameInfo({ ...game });
    history.push("/play");
  };

  return (
    <table className="table table-hover load-table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Black</th>
          <th scope="col">White</th>
          <th scope="col">Points</th>
          <th scope="col">Created at</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {games.map((game, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td className="text-capitalize">{game.players.black}</td>
            <td className="text-capitalize">{game.players.white}</td>
            <td>
              {countOfCells(game.table, "B")} - {countOfCells(game.table, "W")}
            </td>
            <td>
              {moment.duration(-1 * moment().diff(game.matchId)).humanize(true)}
            </td>
            <td>
              <button className="btn btn-sm" onClick={() => loadGame(game)}>
                Load
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadGame;
