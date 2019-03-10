import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  Form,
  Message,
  Input,
  Button,
  Segment,
  Header
} from "semantic-ui-react";
import TokenString from "./TokenString";

export default function InviteForm() {
  const auth = useContext(AuthContext);

  const [id, setId] = useState("");
  const [inviteToken, setInviteToken] = useState("");

  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const token = await auth.invite(id, []);
    setInviteToken(token);

    setLoading(false);
    setId("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {auth.invitationError ? (
        <Message negative>{auth.invitationError}</Message>
      ) : null}

      <Form.Field>
        <Input
          type="text"
          label="Id"
          value={id}
          required
          disabled={loading}
          onChange={onChange(setId)}
        />
      </Form.Field>

      <Button>{loading ? "Inviting..." : "Invite"}</Button>

      {inviteToken ? (
        <Segment>
          <Header as="h3">Invite Token</Header>
          <TokenString>{inviteToken}</TokenString>{" "}
        </Segment>
      ) : null}
    </Form>
  );
}
