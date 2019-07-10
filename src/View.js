import React, { Component } from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class View extends Component {
  state = {
    active: 0
  };

  cycle = (index = null) => {
    if (index !== null) {
      this.setState({ active: index });
    } else {
      const { fileList } = this.props;
      const { active } = this.state;
      this.setState({ active: (active + 1) % fileList.length });
    }
  };

  render() {
    const { active } = this.state;
    const { fileList, currFolder } = this.props;
    return (
      <>
        <div id="top-nav">
          <Header
            fileList={fileList}
            currFolder={currFolder}
            active={active}
            cycle={this.cycle}
          />
        </div>
        <div className="view-wrap">
          <Link
            to={`${fileList[(active + 1) % fileList.length]}`}
            onClick={() => this.cycle()}
          >
            <img src={require(`${fileList[active]}`)} alt="" />
          </Link>
        </div>
      </>
    );
  }
}

View.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.string),
  currFolder: PropTypes.string
};

View.defaultProps = {
  fileList: [
    "./test_imgs/1-ata-company-portal-sketch.png",
    "./test_imgs/2-ata-training-sktch.png",
    "./test_imgs/3-ata-knowledge-base-sketch.png"
  ],
  currFolder: "inFolder"
};

export default View;
