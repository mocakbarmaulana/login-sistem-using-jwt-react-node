import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import "./Welcome.css";

const Welcome = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;

  if (isLogged) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div className="welcome">
        <div className="info">
          <h1>Welcome to example app,</h1>
          <p>please login or register for continue to using this app</p>
        </div>
      </div>
    );
  }
};

export default Welcome;
