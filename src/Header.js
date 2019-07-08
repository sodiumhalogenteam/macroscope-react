import React, { Component } from "react";

class Header extends Component {
  render() {
    const personas = [
      "../../client_view/ata/personas/1-persona.png",
      "../../client_view/ata/personas/2-persona.png",
      "../../client_view/ata/personas/3-persona.png"
    ];
    const currFolder = "ata";
    return (
      <div className="title">
        <h1>
          <strong>Folder:</strong> {currFolder}
        </h1>
        <ul className="personas">
          {personas.length
            ? personas.map(persona => (
                <li>
                  <img
                    src={require("./assets/_images/persona-icon.png")}
                    alt=""
                  />
                  <img src={persona} className="thumb" alt="" />
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default Header;
