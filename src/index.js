import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import { ErrorProvider } from "./contexts/ErrorContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import * as serviceWorker from "./serviceWorker";
import {
  authTokenUrl,
  authRegisterUrl,
  authRefreshUrl,
  authGrantUrl,
  authGetUserUrl
} from "./config";

ReactDOM.render(
  <ErrorProvider>
    <LoadingProvider>
      <AuthProvider
        tokenUrl={authTokenUrl}
        registerUrl={authRegisterUrl}
        refreshUrl={authRefreshUrl}
        grantUrl={authGrantUrl}
        getUserUrl={authGetUserUrl}
      >
        <Container style={{ marginTop: "2em" }}>
          <App />
        </Container>
      </AuthProvider>
    </LoadingProvider>
  </ErrorProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
