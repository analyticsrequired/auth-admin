import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";
import { LoadingContext } from "./LoadingContext";

export default function RegistrationForm() {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    loading.setIsLoading(true);

    await auth.register(userId, password);

    loading.setIsLoading(false);

    setUserId("");
    setPassword("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {auth.registrationError ? (
        <Message negative>{auth.registrationError}</Message>
      ) : null}

      <Form.Field>
        <Input
          type="text"
          label="User Id"
          value={userId}
          required
          onChange={onChange(setUserId)}
        />
      </Form.Field>

      <Form.Field>
        <Input
          type="password"
          label="Password"
          value={password}
          required
          onChange={onChange(setPassword)}
        />
      </Form.Field>

      <PrimaryButton basic>Register</PrimaryButton>
    </Form>
  );
}
