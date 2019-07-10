import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { currFolder, fileList, active, cycle, personas } = this.props;
    return (
      <>
        <div className="title">
          <h1>
            <strong>Folder:</strong> {currFolder}
          </h1>
          <ul className="personas">
            {personas.length
              ? personas.map(persona => (
                  <li key={persona}>
                    <img
                      src={require("./assets/_images/persona-icon.png")}
                      alt=""
                    />
                    <img src={require(`${persona}`)} className="thumb" alt="" />
                  </li>
                ))
              : null}
          </ul>
        </div>
        {fileList.length ? (
          <div className="center">
            <ul className="paginate">
              <li className="up">
                <Link to="/">Up</Link>
              </li>
              {fileList.map((file, index) => (
                <li className={index === active ? "active" : null} key={file}>
                  <Link to={`${file}`} onClick={() => cycle(index)}>
                    {index + 1}
                  </Link>
                  <img src={require(`${file}`)} className="thumb" alt="" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </>
    );
  }
}

Header.protoTypes = {
  fileList: PropTypes.arrayOf(PropTypes.string),
  currFolder: PropTypes.string.isRequired,
  active: PropTypes.number,
  cycle: PropTypes.func.isRequired,
  personas: PropTypes.arrayOf(PropTypes.string)
};

Header.defaultProps = {
  fileList: [],
  active: 0,
  personas: [
    "./test_imgs/1-persona.png",
    "./test_imgs/2-persona.png",
    "./test_imgs/3-persona.png"
  ]
};

export default Header;
