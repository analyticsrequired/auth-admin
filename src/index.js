import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { authTokenUrl, authRegisterUrl, authInviteUrl } from "./config";

ReactDOM.render(
  <AuthProvider
    tokenUrl={authTokenUrl}
    registerUrl={authRegisterUrl}
    inviteUrl={authInviteUrl}
  >
    <Container style={{ marginTop: "2em" }}>
      <App />
    </Container>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
