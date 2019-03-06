import React, { Fragment } from "react";
import { Segment, Header } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function NotLoggedIn(props) {
  return (
    <Fragment>
      <Segment>
        <Header as="h2">Login</Header>
        <LoginForm />
      </Segment>

      <Segment>
        <Header as="h2">Register</Header>
        <RegistrationForm />
      </Segment>
    </Fragment>
  );
}
