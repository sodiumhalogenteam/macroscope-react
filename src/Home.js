import React, { Component } from "react";

class Home extends Component {
  render() {
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
      <div className="center">
        <p>
          As we are working on your project, we will post files here for you to
          view.
          <br />
          Choose a folder from below.
        </p>
        <ul className="folder_names">
          {folders.length ? (
            folders.map(folder => (
              <div>
                <li>
                  <a href={folder.folderPath}>{folder.folderName}</a>
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

        <a href="#" className="show_hide">
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
        </div>
      </div>
    );
  }
}

export default Home;
