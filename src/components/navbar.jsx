import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { GameContext } from "../context";

const Navbar = (props) => {
  const { gameInfo } = useContext(GameContext);

  const [state, setState] = useState(0);

  return (
    <nav className="myNavbar">
      <div
        className="container d-flex py-2"
        style={{ justifyContent: "space-evenly" }}
      >
        {gameInfo.matchId && window.location.pathname !== "/play" && (
          <NavLink
            className="nav-item nav-link"
            to="/play"
            onClick={() => setState(Date.now())}
          >
            Resume
          </NavLink>
        )}
        <NavLink
          className="nav-item nav-link"
          to="/new-game"
          onClick={() => setState(Date.now())}
        >
          New Game
        </NavLink>
        <NavLink
          className="nav-item nav-link"
          to="/load-game"
          onClick={() => setState(Date.now())}
        >
          Load Game
        </NavLink>
        <NavLink
          className="nav-item nav-link"
          to="/results"
          onClick={() => setState(Date.now())}
        >
          Results
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
