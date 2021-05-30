import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { DataProvider } from "./GlobalState";

// Components
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </DataProvider>
  );
};

export default App;
