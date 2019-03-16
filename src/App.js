import React, { useContext, Fragment } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import logo from "./logo.png";
import { Dimmer, Loader } from "semantic-ui-react";

function App() {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const existingRefreshToken = window.localStorage.getItem("ar_refresh_token");

  if (existingRefreshToken) {
    auth.refresh(existingRefreshToken);
  }

  return (
    <Fragment>
      <img src={logo} alt="Analytics Required" />
      {auth.refreshToken ? <LoggedIn /> : <NotLoggedIn />}
      {loading.isLoading ? (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      ) : null}
    </Fragment>
  );
}

export default App;
