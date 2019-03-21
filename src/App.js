import React, { useContext, Fragment } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { LoadingContext } from "./contexts/LoadingContext";
import LoggedIn from "./pages/LoggedIn";
import NotLoggedIn from "./pages/NotLoggedIn";
import logo from "./logo.png";

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
