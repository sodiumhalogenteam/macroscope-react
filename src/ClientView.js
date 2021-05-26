import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AWS from "aws-sdk";
import { awslistObjects } from "./data/awsListObject";

// var s3 = new AWS.S3({
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET,
//   region: process.env.REACT_APP_AWS_REGION,
// });

class Home extends Component {
  state = {
    folders: [],
    asc: false,
  };

  async componentDidMount() {
    const that = this;

    const data = [];
    await awslistObjects("macroscope-sh", data);
    console.log({ data });

    const len = data.length;
    let tempArr = [];

    for (var i = 1; i < len; i++) {
      if (data[i].Size === 0) {
        const sdate = JSON.stringify(data[i].LastModified).replace(
          '"',
          ""
        );

        const isRootFolder = data[i].Key.split("/").length < 3;
        if (isRootFolder) {
          tempArr.push({
            key: data[i].Key.replace("/", ""),
            date: sdate.substring(0, sdate.indexOf("T")),
          });
        }
      }
      console.log(tempArr.length);
    }

    that.setState({ folders: tempArr });
  }

  sortByDate() {
    const { asc, folders } = this.state;
    const tempArr = [...folders];

    if (!asc) {
      tempArr.sort(function (a, b) {
        var keyA = new Date(a.date),
          keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    } else {
      tempArr.sort(function (a, b) {
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

  render() {
    const { folders, hiddenFolders, showHiddenFolders } = this.state;
    return (
      <div className="grid">
        <div id="top-nav">
          <Header currFolder="clients" project="clients" />
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
                folders.map((folder) => (
                  <div key={folder.key}>
                    <li>
                      <Link
                        to={`/${folder.key}/`}
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
                    hiddenFolders.map((folder) => (
                      <div key={folder.key}>
                        <li>
                          <Link to={`/${this.props.match.params.project}/`}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
