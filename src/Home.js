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
  state = { folders: [] };

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
        for (var i = 1; i < len; i++) {
          if (data.Contents[i].Size === 0) {
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
          }
        }
        that.setState({ folders: tempArr });
      }
    );
  }

  render() {
    const { folders } = this.state;
    return (
      <div className="grid">
        <div id="top-nav">
          <Header currFolder="ata" project={this.props.match.params.project} />
          <div className="center">
            <p>
              As we are working on your project, we will post files here for you
              to view.
              <br />
              Choose a folder from below.
            </p>
            <ul className="folder_names">
              {folders.length ? (
                folders.map(folder => (
                  <div key={folder.key}>
                    <li>
                      <Link
                        to={`/${this.props.match.params.project}/${
                          folder.key
                        }/`}
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

            {/* <a href="#" className="show_hide">
          +
        </a>
        <div className="slidingDiv">
          <ul className="folder_names hidden_folders">
            <li>
              <a href="archive_hide/index.html">archive </a>
            </li>
            <span>December 31 1969</span>
            <li>
              <a href="design_catalyst_hide/index.html">design catalyst </a>
            </li>
            <span>December 31 1969</span>
          </ul>
          <a href="#" className="show_hide">
            +
          </a>
        </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
