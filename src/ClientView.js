import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { awslistObjects } from "./data/awsListObject";
import { getCookie } from "./utils/cookies";
import { Authenticate } from "./Authenticate";

function Home() {
  const [folders, setFolders] = useState([]);
  const [asc, setAsc] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = getCookie("auth");

    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(async () => {
    const data = [];
    await awslistObjects("macroscope-sh", data);

    const len = data.length;
    let tempArr = [];

    for (var i = 1; i < len; i++) {
      if (data[i].Size === 0) {
        const sdate = JSON.stringify(data[i].LastModified).replace('"', "");

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

    setFolders(tempArr);
  }, []);

  function sortByDate() {
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

    setAsc(!asc);
    setFolders(tempArr);
  }

  if (!isAuthenticated)
    return <Authenticate setIsAuthenticated={setIsAuthenticated} />;

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
                <button className="sort-btn" onClick={() => this.sortByDate()}>
                  LAST UPDATED
                </button>
              </span>
            </li>
            {folders.length ? (
              folders.map((folder) => (
                <div key={folder.key}>
                  <li>
                    <Link to={`/${folder.key}/`}>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
