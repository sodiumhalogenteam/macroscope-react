import React from "react";
import "./assets/_styles/App.css";
import Header from "./Header";
import Home from "./Home";

function App() {
  return (
    <div className="grid">
      <div id="top-nav">
        <Header />
        <Home />
      </div>
    </div>
  );
}

export default App;
