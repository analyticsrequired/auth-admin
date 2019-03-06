import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const localStorageKey = "ar_auth_token";

export const AuthContext = createContext();

export function AuthProvider({ tokenUrl, children }) {
  const [state, setState] = useState(
    window.localStorage.getItem(localStorageKey)
  );

  const login = async (username, password) => {
    const response = await fetch(tokenUrl, {
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

    if (response.status === 401) {
      throw new Error("Invalid username or password");
    }

    if (response.status !== 201) {
      throw new Error("An error occurred while authenticating");
    }

    const token = await response.text();

    window.localStorage.setItem(localStorageKey, token);
    setState(token);
  };

  const logout = () => {
    window.localStorage.removeItem(localStorageKey);
    setState(null);
  };

  const user = state ? jwtDecode(state) : null;

  return (
    <AuthContext.Provider value={{ token: state, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
