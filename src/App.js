import React, { useContext } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";

function App() {
  const auth = useContext(AuthContext);
  return auth.token ? <LoggedIn /> : <NotLoggedIn />;
}

export default App;
