import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function LoginForm() {
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
