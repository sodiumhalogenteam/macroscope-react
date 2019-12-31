import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AWS from "aws-sdk";

var s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET,
  region: process.env.REACT_APP_AWS_REGION
});

class Home extends Component {
  state = {
    folders: [],
    hiddenFolders: [],
    showHiddenFolders: false,
    projectDataState: {},
    asc: false
  };

  getProjectData() {
    fetch(
      `https://macroscope-sh.s3.us-east-1.amazonaws.com/${this.props.match.params.project}/project.json`
    )
      .then(response => response.json())
      .then(data => this.setState({ projectDataState: data }));
  }

  async componentDidMount() {
    const that = this;

    s3.listObjectsV2(
      {
        Bucket: "macroscope-sh",
        Prefix: `${that.props.match.params.project}/`
      },
      function(err, data) {
        const len = data.Contents.length;

        let tempArr = [];
        let hiddenTempArr = [];
        for (var i = 1; i < len; i++) {
          const hasProjectJson = RegExp("project.json", "g").test(
            data.Contents[i].Key
          );
          if (hasProjectJson) that.getProjectData();
          if (
            data.Contents[i].Size === 0 &&
            !data.Contents[i].Key.includes("hide")
          ) {
            const sdate = JSON.stringify(data.Contents[i].LastModified).replace(
              '"',
              ""
            );
            tempArr.push({
              key: data.Contents[i].Key.replace(
                `${that.props.match.params.project}/`,
                ""
              ).replace("/", ""),
              date: sdate.substring(0, sdate.indexOf("T"))
            });
          } else if (data.Contents[i].Size === 0) {
            const sdate = JSON.stringify(data.Contents[i].LastModified).replace(
              '"',
              ""
            );
            hiddenTempArr.push({
              key: data.Contents[i].Key.replace(
                `${that.props.match.params.project}/`,
                ""
              ).replace("/", ""),
              date: sdate.substring(0, sdate.indexOf("T"))
            });
          }
        }
        that.setState({ folders: tempArr });
        that.setState({ hiddenFolders: hiddenTempArr });
      }
    );
  }

  sortByDate() {
    const { asc, folders } = this.state;
    const tempArr = [...folders];

    if (!asc) {
      tempArr.sort(function(a, b) {
        var keyA = new Date(a.date),
          keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    } else {
      tempArr.sort(function(a, b) {
        var keyA = new Date(a.date),
          keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
    }

    this.setState({ asc: !asc });
    this.setState({ folders: tempArr });
  }

  toggleHidden() {
    const { showHiddenFolders } = this.state;
    this.setState({ showHiddenFolders: !showHiddenFolders });
  }

  render() {
    const { folders, hiddenFolders, showHiddenFolders } = this.state;
    console.log(this.state.projectDataState);

    return (
      <div className="grid">
        <div id="top-nav">
          <Header
            currFolder={this.props.match.params.project}
            project={this.props.match.params.project}
          />
          <div className="center">
            <p>
              As we are working on your project, we will post files here for you
              to view.
              <br />
              Choose a folder from below.
            </p>
            <ul className="folder_names">
              <li className="list-title">FOLDER NAME</li>
              <li>
                <span>
                  <button
                    className="sort-btn"
                    onClick={() => this.sortByDate()}
                  >
                    LAST UPDATED
                  </button>
                </span>
              </li>
              {folders.length ? (
                folders.map(folder => (
                  <div key={folder.key}>
                    <li>
                      <Link
                        to={`/${this.props.match.params.project}/${folder.key}/`}
                      >
                        {folder.key.replace(/-|_/g, " ")}
                      </Link>
                    </li>
                    <li>
                      <span>{folder.date}</span>
                    </li>
                  </div>
                ))
              ) : (
                <span className="white">
                  Looks like there's nothing here...yet!
                </span>
              )}
            </ul>
            <br />

            <div className="slidingDiv">
              {showHiddenFolders ? (
                <ul className="folder_names hidden_folders">
                  {hiddenFolders.length ? (
                    hiddenFolders.map(folder => (
                      <div key={folder.key}>
                        <li>
                          <Link
                            to={`/${this.props.match.params.project}/${folder.key}/`}
                          >
                            {folder.key.replace(/-|_/g, " ")}
                          </Link>
                        </li>
                        <li>
                          <span>{folder.date}</span>
                        </li>
                      </div>
                    ))
                  ) : (
                    <span className="white">
                      Looks like there's nothing here...yet!
                    </span>
                  )}
                </ul>
              ) : null}
              <button onClick={() => this.toggleHidden()} className="show_hide">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
