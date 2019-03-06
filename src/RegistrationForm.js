import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";

export default function RegistrationForm() {
  const auth = useContext(AuthContext);

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await auth.register(token, password);
    } catch (e) {
      setError(e.message);
      setToken("");
      setPassword("");
    }
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {error ? <Message negative>{error}</Message> : null}

      <Form.Field>
        <Input
          type="text"
          label="Invitation"
          value={token}
          required
          onChange={onChange(setToken)}
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

      <Button>Register</Button>
    </Form>
  );
}
