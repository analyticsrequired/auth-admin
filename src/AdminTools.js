import React, { useContext } from "react";
import { Segment, Header } from "semantic-ui-react";
import { AuthContext } from "./contexts/AuthContext";
import GetUser from "./GetUser";

export default function AdminTools() {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <p>No user</p>;
  }

  return auth.user.permissions.includes("admin") ? (
    <Segment color="orange">
      <Header as="h2">Admin Tools</Header>

      <Segment>
        <Header as="h3">Get User</Header>

        <GetUser />
      </Segment>
    </Segment>
  ) : null;
}
