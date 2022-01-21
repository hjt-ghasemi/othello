import config from "./config.json";

export const createTable = (size) => {
  const table = [];
  for (let i = 0; i < size; i++) {
    table[i] = [];
    for (let j = 0; j < size; j++) {
      table[i][j] = 0;
    }
  }

  const middle = size / 2 - 1;

  table[middle][middle] = "W";
  table[middle + 1][middle + 1] = "W";
  table[middle + 1][middle] = "B";
  table[middle][middle + 1] = "B";
  return table;
};

export const createTableWithHelp = (table, turn) => {
  const competitorTun = turn === "W" ? "B" : "W";

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      if (table[i][j] !== turn) continue;
      helpCellsDetector(table, i, j, competitorTun, 0, -1);
      helpCellsDetector(table, i, j, competitorTun, 1, -1);
      helpCellsDetector(table, i, j, competitorTun, 1, 0);
      helpCellsDetector(table, i, j, competitorTun, 1, 1);
      helpCellsDetector(table, i, j, competitorTun, 0, 1);
      helpCellsDetector(table, i, j, competitorTun, -1, 1);
      helpCellsDetector(table, i, j, competitorTun, -1, 0);
      helpCellsDetector(table, i, j, competitorTun, -1, -1);
    }
  }

  return table;
};

export const countOfCells = (table, value) => {
  let count = 0;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      if (table[i][j] === value) count++;
    }
  }

  return count;
};

export const renderTable = (ctx, size, table, turn, showHelp) => {
  const cellSize = config.cellSize;
  const radius = config.radius;

  ctx.clearRect(0, 0, 2000, 2000);
  ctx.strokeStyle = "#a6ece033";

  for (let i = 1; i < size; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, 2000);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(2000, i * cellSize);
    ctx.stroke();
  }

  if (turn === "W") {
    ctx.strokeStyle = "#eeeeee";
  }
  if (turn === "B") {
    ctx.strokeStyle = "#333333";
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const x = cellSize / 2 + j * cellSize;
      const y = cellSize / 2 + i * cellSize;

      if (table[i][j] === "W") {
        ctx.fillStyle = "#eeeeee";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (table[i][j] === "B") {
        ctx.fillStyle = "#333333";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (table[i][j] === "A" && showHelp) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
};

export const findClickedCell = (nativeEvent, size) => {
  let i = Math.floor(
    (nativeEvent.offsetY / nativeEvent.target.clientWidth) * size
  );
  let j = Math.floor(
    (nativeEvent.offsetX / nativeEvent.target.clientWidth) * size
  );

  i = i < 0 ? 0 : i;
  i = i === size ? i - 1 : i;

  j = j < 0 ? 0 : j;
  j = j === size ? j - 1 : j;

  return [i, j];
};

export const fillingCells = (table, row, col, turn) => {
  let cells = [];
  const competitorTun = turn === "W" ? "B" : "W";
  checkingDirections(cells, table, row, col, 0, -1, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, 1, -1, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, 1, 0, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, 1, 1, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, 0, 1, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, -1, 1, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, -1, 0, turn, competitorTun);
  cells = [];
  checkingDirections(cells, table, row, col, -1, -1, turn, competitorTun);
  return table;
};

export const createCopy = (table) => {
  const copyOfTable = [];
  table.forEach((row) => {
    copyOfTable.push([...row]);
  });

  return copyOfTable;
};

function helpCellsDetector(
  table,
  row,
  col,
  competitorTun,
  i,
  j,
  status = false
) {
  if (
    row + i < 0 ||
    row + i === table.length ||
    col + j < 0 ||
    col + j === table.length
  ) {
    return;
  }

  if (table[row + i][col + j] === competitorTun) {
    status = true;
    i = nextStep(i);
    j = nextStep(j);
    helpCellsDetector(table, row, col, competitorTun, i, j, status);
  } else if (table[row + i][col + j] === 0 && status === true) {
    table[row + i][col + j] = "A";
  }
}

function checkingDirections(
  cells,
  table,
  row,
  col,
  i,
  j,
  turn,
  competitorTun,
  status = false
) {
  if (
    row + i < 0 ||
    row + i === table.length ||
    col + j < 0 ||
    col + j === table.length
  ) {
    return;
  }

  const pointer = table[row + i][col + j];
  if (pointer === turn || pointer === competitorTun) {
    if (status === false && pointer === turn) return;
    cells.push([row, col]);
    if (status === true && pointer === turn) {
      cells.forEach((cell) => {
        table[cell[0]][cell[1]] = turn;
      });
    } else {
      row = row + i;
      col = col + j;
      checkingDirections(
        cells,
        table,
        row,
        col,
        i,
        j,
        turn,
        competitorTun,
        true
      );
    }
  }
}

function nextStep(x) {
  if (x === 0) return 0;
  if (x > 0) return x + 1;
  if (x < 0) return x - 1;
}

export const saveGameInLS = (gameInfo) => {
  let games = JSON.parse(localStorage.getItem("games"));
  if (!games) games = [];

  const index = games.findIndex((game) => game.matchId === gameInfo.matchId);

  if (index < 0) {
    games.unshift({ ...gameInfo });
  } else {
    games[index] = { ...gameInfo };
  }

  localStorage.setItem("games", JSON.stringify(games));
};

export const addResultToLS = (player, status) => {
  let results = JSON.parse(localStorage.getItem("results"));
  if (!results) results = [];

  let index = results.findIndex((item) => player === item.player);

  if (index < 0) {
    results.push({ player, wins: 0, losses: 0, draws: 0 });
    index = results.length - 1;
  }

  switch (status) {
    case "win":
      results[index].wins++;
      break;
    case "loss":
      results[index].losses++;
      break;
    case "draw":
      results[index].draws++;
      break;
    default:
      break;
  }
  localStorage.setItem("results", JSON.stringify(results));
};
