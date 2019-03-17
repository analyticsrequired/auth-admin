import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import { Form, Message } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";
import PermissionsInput from "./PermissionsInput";

export default function GrantForm(props) {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [permissions, setPermissions] = useState(props.user.permissions || []);

  async function onSubmit(e) {
    e.preventDefault();

    loading.setIsLoading(true);

    await auth.grant(props.user.userId, permissions.join(" "));

    loading.setIsLoading(false);
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {auth.grantError ? <Message negative>{auth.grantError}</Message> : null}

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
