import React, { useState } from "react";
import { setCookie } from "./utils/cookies";

export function Authenticate({ setIsAuthenticated }) {
  const [password, setPassword] = useState("");
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === "bonaire") {
      setCookie("auth", "qwewe7878768???//", 13);
      setIsAuthenticated(true);
    }
  };
  return (
    <div className="formPage">
      <form onSubmit={handleSubmit}>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </label>

        <input type="submit" value="Submit" className="submit-button"/>
      </form>
    </div>
  );
}
