import React, { useContext } from "react";
import { Segment, Header } from "semantic-ui-react";
import { AuthContext } from "./AuthContext";

export default function AdminTools() {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <p>No user</p>;
  }

  return auth.user.permissions.includes("admin") ? (
    <Segment>
      <Header as="h2">Admin Tools</Header>
    </Segment>
  ) : null;
}
