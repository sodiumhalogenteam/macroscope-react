import React from "react";
import "./assets/_styles/App.css";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import View from "./View";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/view" component={View} />
    </Switch>
  );
}

export default App;
