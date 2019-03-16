import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";

export default function RegistrationForm() {
  const auth = useContext(AuthContext);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    await auth.register(userId, password);

    setLoading(false);
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
          disabled={loading}
          onChange={onChange(setUserId)}
        />
      </Form.Field>

      <Form.Field>
        <Input
          type="password"
          label="Password"
          value={password}
          required
          disabled={loading}
          onChange={onChange(setPassword)}
        />
      </Form.Field>

      <PrimaryButton basic>
        {loading ? "Registering..." : "Register"}
      </PrimaryButton>
    </Form>
  );
}
