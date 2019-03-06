import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [state, setState] = useState();

  const login = async (username, password) => {
    const response = await fetch("http://localhost:3001/token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: username,
        password
      })
    });

    if (response.status !== 201) return;

    const token = await response.text();

    setState(token);
  };

  const logout = () => setState(null);

  const user = state ? jwtDecode(state) : null;

  return (
    <AuthContext.Provider value={{ token: state, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
