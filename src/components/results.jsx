import React from "react";
import _ from "lodash";

const Results = () => {
  let results = JSON.parse(localStorage.getItem("results"));
  if (!results || results.length === 0) {
    return (
      <div className="display-center">
        <h1 className="LS-header">
          There is no game result in browser storage yet.
          <br />
          Make sure that localStorage is available.
        </h1>
      </div>
    );
  }

  results = _.orderBy(results, ["wins", "player"], ["desc", "asc"]);

  return (
    <table className="table table-hover result-table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col" className="text-success">
            Win
          </th>
          <th scope="col" className="text-danger">
            Loss
          </th>
          <th scope="col" className="text-info">
            Draw
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td className="text-capitalize">{result.player}</td>
            <td>{result.wins}</td>
            <td>{result.losses}</td>
            <td>{result.draws}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Results;
