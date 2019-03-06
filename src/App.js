import React, { useContext } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import LoginForm from "./LoginForm";
import Token from "./Token";

function App() {
  const auth = useContext(AuthContext);
  return auth.token ? <Token /> : <LoginForm />;
}

export default App;
