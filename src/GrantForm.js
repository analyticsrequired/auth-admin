import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import { Form, Message, Input } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";

export default function GrantForm() {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [userId, setUserId] = useState("");
  const [scope, setScope] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    loading.setIsLoading(true);

    await auth.grant(userId, scope);

    loading.setIsLoading(false);

    setUserId("");
    setScope("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {auth.grantError ? <Message negative>{auth.grantError}</Message> : null}

      <Form.Field>
        <Input
          type="text"
          label="User Id"
          value={userId}
          autoFocus
          required
          onChange={onChange(setUserId)}
        />
      </Form.Field>

      <Form.Field>
        <Input
          type="text"
          label="Scope"
          value={scope}
          required
          onChange={onChange(setScope)}
        />
      </Form.Field>

      <PrimaryButton basic>Grant</PrimaryButton>
    </Form>
  );
}
