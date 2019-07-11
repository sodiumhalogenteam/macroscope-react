import React from "react";
import "./assets/_styles/App.css";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import View from "./View";

function App() {
  return (
    <Switch>
      <Route exact path="/:project" component={Home} />
      <Route path="/:project/:folder/:file" component={View} />
      <Route path="/:project/:folder" component={View} />
    </Switch>
  );
}

export default App;
