import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";

export default function GrantForm() {
  const auth = useContext(AuthContext);

  const [userId, setUserId] = useState("");
  const [scope, setScope] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    await auth.grant(userId, scope);

    setLoading(false);
    setUserId("");
    setScope("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type="text"
          label="User Id"
          value={userId}
          autoFocus
          required
          disabled={loading}
          onChange={onChange(setUserId)}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="text"
          label="Scope"
          value={scope}
          required
          disabled={loading}
          onChange={onChange(setScope)}
        />
      </Form.Field>

      <PrimaryButton basic>{loading ? "Granting..." : "Grant"}</PrimaryButton>
    </Form>
  );
}
