import React, { useContext, useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { ErrorContext } from "../contexts/ErrorContext";
import { AuthContext } from "../contexts/AuthContext";
import { LoadingContext } from "../contexts/LoadingContext";
import PrimaryButton from "./PrimaryButton";
import PermissionsInput from "./PermissionsInput";

export default function GrantForm(props) {
  const auth = useContext(AuthContext);
  const errors = useContext(ErrorContext);
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
      {errors.grantError ? (
        <Message negative>{errors.grantError}</Message>
      ) : null}

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
