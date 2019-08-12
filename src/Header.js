import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AWS from "aws-sdk";

var s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET,
  region: process.env.REACT_APP_AWS_REGION
});

class Header extends Component {
  state = {
    personaList: []
  };

  async componentDidMount() {
    const that = this;
    s3.listObjectsV2(
      {
        Bucket: "macroscope-sh",
        Prefix: `${that.props.project}/personas/`
      },
      function(err, data) {
        const len = data.Contents.length;
        let tempArr = [];
        for (var i = 1; i < len; i++) {
          tempArr.push(
            s3.getSignedUrl("getObject", {
              Bucket: "macroscope-sh",
              Key: `${data.Contents[i].Key}`
            })
          );
        }
        that.setState({ personaList: tempArr });
      }
    );
  }

  render() {
    const {
      currFolder,
      fileList,
      active,
      cycle,
      toggleWidth,
      page,
      expanded
    } = this.props;
    const { personaList } = this.state;
    return (
      <>
        <div className="title">
          {page === "view" ? (
            <button
              className={!expanded ? "expand" : "compress"}
              onClick={toggleWidth}
            />
          ) : null}
          <h1>
            <strong>Folder:</strong> {currFolder}
          </h1>
          <ul className="personas">
            {personaList.length
              ? personaList.map(persona => (
                  <li key={persona}>
                    <img
                      src={require("./assets/_images/persona-icon.png")}
                      alt=""
                    />
                    <img src={`${persona}`} className="thumb" alt="" />
                  </li>
                ))
              : null}
          </ul>
        </div>
        {fileList.length ? (
          <div className="center">
            <ul className="paginate">
              <li className="up">
                <Link to="../">Up</Link>
              </li>
              {fileList.map((file, index) => (
                <li
                  className={index === active ? "active" : null}
                  key={file.key}
                >
                  <Link to={`${file.key}`} onClick={() => cycle(index)}>
                    {index + 1}
                  </Link>
                  <img src={`${file.url}`} className="thumb" alt="" />
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
  project: PropTypes.string.isRequired,
  toggleWidth: PropTypes.func,
  page: PropTypes.string,
  expanded: PropTypes.bool
};

Header.defaultProps = {
  expanded: null,
  active: 0,
  page: "",
  fileList: [],
  toggleWidth: () => null
};

export default Header;
