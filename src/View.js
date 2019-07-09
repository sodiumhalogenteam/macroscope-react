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
    const { fileList } = this.props;
    return (
      <>
        <div id="top-nav">
          <Header
            fileList={fileList}
            currFolder="inFolder"
            active={active}
            cycle={this.cycle}
          />
        </div>
        <div className="view-wrap">
          <Link
            to={`${fileList[(active + 1) % fileList.length]}`}
            onClick={() => this.cycle()}
          >
            inner
          </Link>
        </div>
      </>
    );
  }
}

View.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.string)
};

View.defaultProps = {
  fileList: ["1-file", "2-file", "3-file"]
};

export default View;
