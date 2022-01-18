import React from "react";
import Navbar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewGame from "./components/newGame";
import LoadGame from "./components/loadGame";
import Results from "./components/results";
import Play from "./components/play";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container py-4 d-flex flex-column align-items-center">
        <Switch>
          <Route path="/new-game" component={NewGame} />
          <Route path="/load-game" component={LoadGame} />
          <Route path="/results" component={Results} />
          <Route path="/play" component={Play} />
          <Redirect to="/new-game" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
