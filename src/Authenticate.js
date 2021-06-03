import React, { useState } from "react";
import { setCookie } from "./utils/cookies";

export function Authenticate({ setIsAuthenticated }) {
  // handlePassword
  // setCookie('auth', 'qwewer', 13)
  const [password, setPassword] = useState("");
  function handlePassword(event){
    setPassword(event.target.value)
  }
  const handleSubmit= (event) => {
    event.preventDefault();
    console.log(password);
    if (password === "bonaire") {
      setCookie("auth", "qwewe7878768???//", 13);
      setIsAuthenticated(true);
    }
  };
  return (
    <div className="formPage">
      Not logged in
      <form onSubmit={handleSubmit}>
        <label>
          Password:      <input type="text" name="password" value={password} onChange={handlePassword} />
        </label>
        
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
