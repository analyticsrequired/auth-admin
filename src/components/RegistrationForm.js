import React, { useContext, useState } from "react";
import { Form, Message, Input } from "semantic-ui-react";
import { ErrorContext } from "../contexts/ErrorContext";
import { AuthContext } from "../contexts/AuthContext";
import PrimaryButton from "./PrimaryButton";

export default function RegistrationForm() {
  const auth = useContext(AuthContext);
  const errors = useContext(ErrorContext);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    await auth.register(userId, password);

    setUserId("");
    setPassword("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {errors.registrationError ? (
        <Message negative>{errors.registrationError}</Message>
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
