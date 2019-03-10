import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const localStorageKey = "ar_auth_token";

export const AuthContext = createContext();

export function AuthProvider({ tokenUrl, registerUrl, inviteUrl, children }) {
  const [sessionToken, setSessionToken] = useState(
    window.localStorage.getItem(localStorageKey)
  );

  const [loginError, setLoginError] = useState();
  const [registrationError, setRegistrationError] = useState();

  const login = async (username, password) => {
    setLoginError();
    try {
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

      if (response.status === 201) {
        const token = await response.text();
        window.localStorage.setItem(localStorageKey, token);
        setSessionToken(token);
        return;
      }

      if (response.status === 401)
        return setLoginError("Invalid username or password");

      setLoginError("Error occurred during login.");
    } catch (e) {
      setLoginError("Error occurred during login.");
    }
  };

  const register = async (inviteToken, password) => {
    setRegistrationError();

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${inviteToken}`
        },
        body: JSON.stringify({
          password
        })
      });

      if (response.status === 201) {
        const payload = jwtDecode(inviteToken);
        login(payload.sub, password);
        return;
      }

      if (response.status === 401)
        return setRegistrationError("Invalid invitation token");

      setRegistrationError("Error occurred during registration.");
    } catch (e) {
      setRegistrationError("Error occurred during registration.");
    }
  };

  const invite = async (sub, grant = []) => {
    const response = await fetch(`${inviteUrl}/${sub}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${sessionToken}`
      },
      body: JSON.stringify({ grant })
    });

    const token = await response.text();

    return token;
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
        invite,
        loginError,
        registrationError,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
