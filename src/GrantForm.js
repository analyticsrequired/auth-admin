import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import { Form, Message, Input } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";
import PermissionsInput from "./PermissionsInput";

export default function GrantForm() {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [userId, setUserId] = useState("");
  const [permissions, setPermissions] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();

    loading.setIsLoading(true);

    await auth.grant(userId, permissions.join(" "));

    loading.setIsLoading(false);

    setUserId("");
    setPermissions([]);
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
        <PermissionsInput
          value={permissions}
          onChange={onChange(setPermissions)}
        />
      </Form.Field>

      <PrimaryButton basic>Grant</PrimaryButton>
    </Form>
  );
}
