import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const localStorageKey = "ar_refresh_token";

export const AuthContext = createContext();

export function AuthProvider({
  tokenUrl,
  registerUrl,
  refreshUrl,
  grantUrl,
  children
}) {
  const [refreshToken, setRefreshToken] = useState(
    window.localStorage.getItem(localStorageKey)
  );

  const [accessToken, setAccessToken] = useState();

  const [loginError, setLoginError] = useState();
  const [registrationError, setRegistrationError] = useState();

  const login = async (userId, password) => {
    setLoginError();

    let response;

    try {
      response = await fetch(tokenUrl, {
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
    } catch (e) {
      setLoginError("Error occurred during login.");
      return;
    }

    if (response.status === 201) {
      const token = await response.text();

      setRefreshToken(token);
      window.localStorage.setItem(localStorageKey, token);

      await refresh(token);
    }

    if (response.status === 401)
      return setLoginError("Invalid user id or password");
  };

  const refresh = async (token = refreshToken) => {
    let response;

    try {
      response = await fetch(refreshUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      });
    } catch (e) {
      setLoginError("Error occurred during login.");
      return;
    }

    if (response.status === 201) {
      const token = await response.text();

      setAccessToken(token);
    }

    if (response.status === 401) {
      const text = await response.text();
      setRefreshToken();
      window.localStorage.removeItem(localStorageKey);
      return setLoginError(`Invalid refresh token: ${text}`);
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
    setRefreshToken(null);
  };

  const grant = async (userId, scope) => {
    await fetch(grantUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`
      },
      body: JSON.stringify({
        userId,
        permissions: scope.split(" ")
      })
    });
  };

  const user = accessToken ? jwtDecode(accessToken) : null;

  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        accessToken,
        user,
        login,
        register,
        refresh,
        loginError,
        registrationError,
        logout,
        grant
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
