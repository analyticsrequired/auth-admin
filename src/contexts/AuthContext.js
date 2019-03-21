import React, { createContext, useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import { ErrorContext } from "./ErrorContext";
import { LoadingContext } from "./LoadingContext";

const localStorageKey = "ar_refresh_token";

export const AuthContext = createContext();

export function AuthProvider({
  tokenUrl,
  registerUrl,
  refreshUrl,
  grantUrl,
  getUserUrl,
  children
}) {
  const errors = useContext(ErrorContext);
  const loading = useContext(LoadingContext);

  const [refreshToken, setRefreshToken] = useState(
    window.localStorage.getItem(localStorageKey)
  );

  const [accessToken, setAccessToken] = useState();

  const login = async (userId, password) => {
    errors.setLoginError();

    let response;

    try {
      loading.setIsLoading(true);

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
      errors.setLoginError("Error occurred during login.");
      return;
    } finally {
      loading.setIsLoading(false);
    }

    if (response.status === 201) {
      const token = await response.text();

      setRefreshToken(token);
      window.localStorage.setItem(localStorageKey, token);

      await refresh(token);
    }

    if (response.status === 401)
      return errors.setLoginError("Invalid user id or password");
  };

  const refresh = async (token = refreshToken) => {
    let response;

    try {
      loading.setIsLoading(true);

      response = await fetch(refreshUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      });

      if (response.status === 201) {
        const token = await response.text();

        setAccessToken(token);
      }

      if (response.status === 401) {
        const text = await response.text();
        setRefreshToken();
        window.localStorage.removeItem(localStorageKey);
        return errors.setLoginError(`Invalid refresh token: ${text}`);
      }
    } catch (e) {
      errors.setRefreshError("Error occurred during refresh.");
      logout();
      return;
    } finally {
      loading.setIsLoading(false);
    }
  };

  const register = async (userId, password) => {
    errors.setRegistrationError();

    try {
      loading.setIsLoading(true);

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

      errors.setRegistrationError("Error occurred during registration.");
    } catch (e) {
      errors.setRegistrationError("Error occurred during registration.");
    } finally {
      loading.setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(localStorageKey);
    setRefreshToken(null);
  };

  const grant = async (userId, scope) => {
    errors.setGrantError();

    let response;

    try {
      loading.setIsLoading(true);

      response = await fetch(grantUrl, {
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
    } catch (e) {
      errors.setGrantError("Error occurred during grant");
    } finally {
      loading.setIsLoading(false);
    }

    switch (response.status) {
      case 201:
        errors.setGrantError();
        break;

      case 400:
        const json = await response.json();
        const { error } = json;
        errors.setGrantError(error);
        break;

      case 403:
        errors.setGrantError("Forbidden");
        break;

      default:
        errors.setGrantError("Unknown error occurred");
        break;
    }
  };

  const getUser = async userId => {
    errors.setGetUserError();

    let response;

    try {
      loading.setIsLoading(true);

      response = await fetch(`${getUserUrl}/${userId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${accessToken}`
        }
      });
    } catch (e) {
      errors.setGetUserError("An error occurred while getting user");
      return;
    } finally {
      loading.setIsLoading(false);
    }

    if (response.status === 200) {
      errors.setGetUserError();
      const user = await response.json();
      return user;
    }

    if (response.status === 403) {
      errors.setGetUserError("Forbidden");
      return;
    }

    if (response.status === 404) {
      errors.setGetUserError("Unknown user");
      return;
    }
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
        logout,
        grant,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
