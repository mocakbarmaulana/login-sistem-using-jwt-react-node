import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import "./Dashboard.css";

const Dashboard = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;

  if (!isLogged) {
    return <Redirect to="/login" />;
  } else {
    return (
      <section className="dashboard">
        <div className="dashboard-info">
          <h1>My Dashboard</h1>
          <p>
            Hello <strong>Moch.Akbar Maulana</strong>, selamat beraktivitas
          </p>
          <div className="button-box">
            <Link to="#" className="button">
              Logout
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default Dashboard;
