import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import AWS from "aws-sdk";

var s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET,
  region: process.env.REACT_APP_AWS_REGION,
});

class View extends Component {
  state = {
    expanded: false,
    active: 0,
    files: [],
  };

  async componentDidMount() {
    const that = this;
    s3.listObjectsV2(
      {
        Bucket: "macroscope-sh",
        Prefix: `${that.props.match.params.project}/${that.props.match.params.folder}/`,
      },
      function (err, data) {
        const len = data.Contents.length;
        let tempArr = [];
        for (var i = 1; i < len; i++) {
          tempArr.push({
            key: data.Contents[i].Key.replace(
              `${that.props.match.params.project}/${that.props.match.params.folder}/`,
              ""
            ),
            url: s3.getSignedUrl("getObject", {
              Bucket: "macroscope-sh",
              Key: `${data.Contents[i].Key}`,
            }),
          });
        }
        that.setState({ files: tempArr });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    // if files state changes
    if (
      prevState.files.length !== this.state.files.length ||
      prevProps.match.url !== this.props.match.url
    ) {
      const urlFile = this.props.match.params.file;
      if (urlFile) {
        const { files } = this.state;
        const len = files.length;
        let fileIndex = 0;
        for (var i = 0; i < len; i++) {
          if (files[i].key === urlFile) {
            fileIndex = i;
            break;
          }
        }
        this.setState({ active: fileIndex });
      }
    }
  }

  cycle = (index = null) => {
    if (index !== null) {
      this.setState({ active: index });
    } else {
      const { active, files } = this.state;
      this.setState({ active: (active + 1) % files.length });
    }
  };

  toggleWidth = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded, active, files } = this.state;
    return (
      <>
        <div id="top-nav">
          <Header
            fileList={files}
            currFolder={this.props.match.params.folder}
            active={active}
            cycle={this.cycle}
            project={this.props.match.params.project}
            toggleWidth={this.toggleWidth}
            page="view"
            expanded={expanded}
          />
        </div>
        <div className="view-wrap">
          {files[(active + 1) % files.length] ? (
            !files[active].key.includes("mp4") ? (
              <Link
                to={`${files[(active + 1) % files.length].key}`}
                onClick={() => this.cycle()}
              >
                <img
                  className={!expanded ? "view-img" : null}
                  src={`${files[active].url}`}
                  alt=""
                />
              </Link>
            ) : files[active].key.includes("mp4") ? (
              <video
                controls
                className="video_size"
                src={`${files[active].url}`}
                type="video/mp4"
              />
            ) : null
          ) : null}
        </div>
      </>
    );
  }
}

export default View;
