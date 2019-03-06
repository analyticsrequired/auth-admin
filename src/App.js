import React, { useContext, useState, Fragment } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";

function App() {
  const auth = useContext(AuthContext);

  return auth.token ? <Token /> : <LoginForm />;
}

function LoginForm() {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    auth.login(username, password);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button>Login</button>
    </form>
  );
}

function Token() {
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.logout();
  }

  return (
    <Fragment>
      <p>{auth.token}</p>
      <button onClick={onClick}>Logout</button>
    </Fragment>
  );
}

export default App;
