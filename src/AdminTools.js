import React, { useContext, Fragment } from "react";
import { Segment, Header } from "semantic-ui-react";
import { AuthContext } from "./AuthContext";
import InviteForm from "./InviteForm";

export default function AdminTools() {
  const auth = useContext(AuthContext);

  return auth.user.permissions.includes("admin") ? (
    <Segment>
      <Header as="h2">Admin Tools</Header>

      <Segment>
        <Header as="h3">Invite</Header>

        <InviteForm />
      </Segment>
    </Segment>
  ) : null;
}
