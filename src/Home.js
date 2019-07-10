import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AWS from "aws-sdk";

var s3 = new AWS.S3({
  accessKeyId: "AKIAY7MIWP6VW6IZNAHG",
  secretAccessKey: "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",
  region: "us-east-1"
});

var params = {
  Bucket: "macroscope-sh",
  Key: "project_map"
};

var url = s3.getSignedUrl("getObject", params);
console.log(url);

// var allKeys = [];
// async function listAllKeys(cb) {
//   await s3.listObjectsV2({ Bucket: "macroscope-sh" }, function(err, data) {
//     cb(data.Contents);
//   });
// }

// listAllKeys(function(data) {
//   console.log(data);
//   allKeys = allKeys.concat(data);
// });
// console.log(allKeys);

class Home extends Component {
  state = { keys: [] };

  async componentDidMount() {
    const that = this;
    s3.listObjectsV2(
      {
        Bucket: "macroscope-sh",
        Prefix: `${that.props.match.params.project}/`,
        Delimiter: ".png"
      },
      function(err, data) {
        const len = data.Contents.length;
        let tempArr = [];
        for (var i = 1; i < len; i++) {
          console.log(data.Contents[i].Key);
          if (data.Contents[i].Size === 0)
            tempArr.push(
              data.Contents[i].Key.replace(
                `${that.props.match.params.project}/`,
                ""
              ).replace("/", "")
            );
        }
        that.setState({ keys: tempArr });
      }
    );
  }

  render() {
    console.log(this.state.keys);
    const folders = [
      {
        folderName: "project map",
        folderPath: "project_map",
        date: "April 03, 2019"
      },
      { folderName: "Temp", folderPath: "temp", date: "April 03, 2019" },
      {
        folderName: "company-portal-sketches",
        folderPath: "company_portal_sketches",
        date: "April 03, 2019"
      },
      {
        folderName: "document links",
        folderPath: "document_links",
        date: "April 03, 2019"
      },
      {
        folderName: "location-cities",
        folderPath: "location-cities",
        date: "April 03, 2019"
      }
    ];
    return (
      <div className="grid">
        <div id="top-nav">
          <Header currFolder="ata" />
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
                  <div key={folder.folderName}>
                    <li>
                      <Link to={`/view/${folder.folderPath}/`}>
                        {folder.folderName}
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
