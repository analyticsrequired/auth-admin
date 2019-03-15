import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const localStorageKey = "ar_auth_token";

export const AuthContext = createContext();

export function AuthProvider({ tokenUrl, registerUrl, children }) {
  const [sessionToken, setSessionToken] = useState(
    window.localStorage.getItem(localStorageKey)
  );

  const [loginError, setLoginError] = useState();
  const [registrationError, setRegistrationError] = useState();

  const login = async (userId, password) => {
    setLoginError();

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          password
        })
      });

      if (response.status === 201) {
        const token = await response.text();
        window.localStorage.setItem(localStorageKey, token);
        setSessionToken(token);
        return;
      }

      if (response.status === 401)
        return setLoginError("Invalid user id or password");

      setLoginError("Error occurred during login.");
    } catch (e) {
      setLoginError("Error occurred during login.");
    }
  };

  const register = async (userId, password) => {
    setRegistrationError();

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          password
        })
      });

      if (response.status === 201) {
        login(userId, password);
        return;
      }

      setRegistrationError("Error occurred during registration.");
    } catch (e) {
      setRegistrationError("Error occurred during registration.");
    }
  };

  const logout = () => {
    window.localStorage.removeItem(localStorageKey);
    setSessionToken(null);
  };

  const user = sessionToken ? jwtDecode(sessionToken) : null;

  return (
    <AuthContext.Provider
      value={{
        token: sessionToken,
        user,
        login,
        register,
        loginError,
        registrationError,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
