import React, { Fragment } from "react";
import { Segment, Header } from "semantic-ui-react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

export default function NotLoggedIn(props) {
  return (
    <Fragment>
      <Segment color="purple">
        <Header as="h2">Login</Header>
        <LoginForm />
      </Segment>

      <Segment color="orange">
        <Header as="h2">Register</Header>
        <RegistrationForm />
      </Segment>
    </Fragment>
  );
}
