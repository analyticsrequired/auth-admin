import React, { useContext, Fragment } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import logo from "./logo.png";

function App() {
  const auth = useContext(AuthContext);

  const existingRefreshToken = window.localStorage.getItem("ar_refresh_token");

  if (existingRefreshToken) {
    auth.refresh(existingRefreshToken);
  }

  return (
    <Fragment>
      <img src={logo} alt="Analytics Required" />
      {auth.refreshToken ? <LoggedIn /> : <NotLoggedIn />}
    </Fragment>
  );
}

export default App;
