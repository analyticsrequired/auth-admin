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
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await auth.invite(id, []);
      setInviteToken(token);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
      setId("");
    }
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {error ? <Message negative>{error}</Message> : null}

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
