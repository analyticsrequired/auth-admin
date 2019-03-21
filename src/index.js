import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import { LoadingProvider } from "./LoadingContext";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import {
  authTokenUrl,
  authRegisterUrl,
  authRefreshUrl,
  authGrantUrl,
  authGetUserUrl
} from "./config";

ReactDOM.render(
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
  </LoadingProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
