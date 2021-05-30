import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import "./Navbar.css";

const Navbar = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;

  const logoutUser = async () => {
    await axios.get("http://localhost:5000/user/logout", {
      withCredentials: true,
    });
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Example App</Link>
        </div>
        <div className="navbar-user">
          <ul>
            {isLogged ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/" onClick={logoutUser}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
