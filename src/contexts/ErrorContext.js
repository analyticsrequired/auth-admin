import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [loginError, setLoginError] = useState();
  const [registrationError, setRegistrationError] = useState();
  const [grantError, setGrantError] = useState();
  const [getUserError, setGetUserError] = useState();

  return (
    <ErrorContext.Provider
      value={{
        loginError,
        setLoginError,
        registrationError,
        setRegistrationError,
        grantError,
        setGrantError,
        getUserError,
        setGetUserError
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}
