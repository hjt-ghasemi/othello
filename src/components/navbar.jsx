import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link mx-5" to="/new-game">
          New Game
        </NavLink>
        <NavLink className="nav-item nav-link mx-5" to="/load-game">
          Load Game
        </NavLink>
        <NavLink className="nav-item nav-link mx-5" to="/results">
          Results
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
