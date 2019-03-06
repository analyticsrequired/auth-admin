import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";

export default function LoginForm() {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await auth.login(username, password, setError);
    } catch (e) {
      setError(e.message);
      setUsername("");
      setPassword("");
    }
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {error ? (
        <Message negative>{error}</Message>
      ) : (
        <Message>
          <p>Please login</p>
        </Message>
      )}

      <Form.Field>
        <Input
          type="text"
          label="Username"
          value={username}
          autoFocus
          required
          onChange={onChange(setUsername)}
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

      <Button>Login</Button>
    </Form>
  );
}
