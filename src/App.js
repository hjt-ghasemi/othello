import React, { createContext, useState } from "react";
import Navbar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewGame from "./components/newGame";
import LoadGame from "./components/loadGame";
import Results from "./components/results";
import Play from "./components/play";
import { GameContext } from "./context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [gameInfo, setGameInfo] = useState({
    players: { white: "", black: "" },
    table: [],
    playerTurn: "B",
    matchId: "",
  });

  return (
    <GameContext.Provider value={{ gameInfo, setGameInfo }}>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/new-game" component={NewGame} />
          <Route
            path="/load-game"
            render={(props) => (
              <LoadGame {...props} setGameInfo={setGameInfo} />
            )}
          />
          <Route path="/results" component={Results} />
          <Route path="/play" component={Play} />
          <Redirect to="/new-game" />
        </Switch>

        <ToastContainer />
      </div>
    </GameContext.Provider>
  );
};

export default App;
